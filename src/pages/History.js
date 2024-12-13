// History.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { List, Button, Input, message, Select } from 'antd';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import axios from 'axios';

const { Option } = Select;

const History = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState('');
  const [currency, setCurrency] = useState('AMD');
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    fetchExpenses();
    fetchExchangeRates();
    // eslint-disable-next-line
  }, []);

  const fetchExpenses = async () => {
    const userId = auth.currentUser.uid;
    const q = query(
      collection(db, 'expenses'),
      where('category', '==', category),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    setExpenses(
      querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/AMD');
      setExchangeRates(response.data.rates);
    } catch (error) {
      message.error('Failed to fetch exchange rates');
    }
  };

  const addExpense = async () => {
    if (!newExpense || isNaN(newExpense)) {
      message.error('Please enter a valid amount');
      return;
    }

    const userId = auth.currentUser.uid;
    await addDoc(collection(db, 'expenses'), {
      userId,
      category,
      amount: parseFloat(newExpense),
      date: new Date().toLocaleDateString('en-GB'),
    });

    message.success('Expense added successfully!');
    fetchExpenses();
    setNewExpense("");
    
  };

  const convertCurrency = (amount) => {
    if (!exchangeRates || !exchangeRates[currency]) return amount;
    return (amount * exchangeRates[currency]).toFixed(2);
  };

  return (
    <div>
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Expenses</h2>
      <Select
        value={currency}
        onChange={(value) => setCurrency(value)}
        style={{ width: 120, marginBottom: '20px' }}
      >
        {Object.keys(exchangeRates).map((key) => (
          <Option key={key} value={key}>
            {key}
          </Option>
        ))}
      </Select>
      <List
        bordered
        dataSource={expenses}
        renderItem={(item) => (
          <List.Item>
            <div>
              <strong>{convertCurrency(item.amount)} {currency}</strong> - {item.date}
            </div>
          </List.Item>
        )}
      />
      <Input
        placeholder="Enter expense amount"
        value={newExpense}
        onChange={(e) => setNewExpense(e.target.value)}
        style={{ marginTop: '20px', marginBottom: '10px' }}
      />
      <Button type="primary" onClick={addExpense}>
        Add Expense
      </Button>
      <Button style={{ marginLeft: '10px' }} onClick={() => navigate('/')}>
        Back to Menu
      </Button>
    </div>
  );
};

export default History;
// Balance.js
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, message, Card, Button } from 'antd';
import axios from 'axios';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';


const { Option } = Select;

const Balance = () => {

  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState('AMD');
  const [exchangeRates, setExchangeRates] = useState({});
  const income = 300000;
  const categories = ['shopping', 'leisure', 'car', 'food'];

  useEffect(() => {
    fetchExpenses();
    fetchExchangeRates();
    // eslint-disable-next-line
  }, []);

  const fetchExpenses = async () => {
    const userId = auth.currentUser.uid;
    const q = query(collection(db, 'expenses'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const expensesData = querySnapshot.docs.map((doc) => doc.data());
    setExpenses(expensesData);

    const totalExpenses = expensesData.reduce((acc, expense) => acc + expense.amount, 0);
    setBalance(income - totalExpenses);
  };

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/AMD');
      setExchangeRates(response.data.rates);
    } catch (error) {
      message.error('Failed to fetch exchange rates');
    }
  };

  const handleCurrencyChange = (value) => {
    setCurrency(value);
  };

  const convertCurrency = (amount) => {
    if (!exchangeRates || !exchangeRates[currency]) return amount;
    return (amount * exchangeRates[currency]).toFixed(2);
  };

  const totalCategoryExpenses = (category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((acc, expense) => acc + expense.amount, 0);
  };

  return (
    <div>
      <h2>Balance Overview</h2>
      <Select
        value={currency}
        onChange={handleCurrencyChange}
        style={{ width: 100, marginBottom: '20px' }}
      >
        {Object.keys(exchangeRates).map((key) => (
          <Option key={key} value={key}>
            {key}
          </Option>
        ))}
      </Select>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <Card title={category} style={{ width: 250 }} key={category}>
            <p>
              <strong>Expense:</strong> {convertCurrency(totalCategoryExpenses(category))} {currency}
            </p>
          </Card>
        ))}
      </div>
      <Card title="Total Balance" style={{ marginTop: '20px', width: 250 }}>
        <p>
          <strong>Income:</strong> {income} {currency}
          <br></br>
          <strong>Balance:</strong> {convertCurrency(balance)} {currency}
        </p>
        
      </Card>
      <Button style={{ marginLeft: '10px' }} onClick={() => navigate('/')}>
        Back to Menu
      </Button>
    </div>
    
  );
};

export default Balance;

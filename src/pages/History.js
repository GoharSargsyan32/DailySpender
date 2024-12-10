import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { List, Button, Input, message } from 'antd';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const History = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState('');

  // eslint-disable-next-line 

  useEffect(() => {
    fetchExpenses();
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
      date: new Date().toLocaleDateString('en-GB'), // День/Месяц/Год
    });

    message.success('Expense added successfully!');
    navigate('/'); // Возвращаемся на главное меню
  };

  return (
    <div>
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Expenses</h2>
      <List
        bordered
        dataSource={expenses}
        renderItem={(item) => (
          <List.Item>
            <div>
              <strong>{item.amount} AMD</strong> - {item.date}
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

import React from 'react';
import { Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const categories = [
  { key: 'food', label: 'Food', color: '#ffa39e' },
  { key: 'car', label: 'Car', color: '#bae637' },
  { key: 'leisure', label: 'Leisure', color: '#ffd666' },
  { key: 'shopping', label: 'Shopping', color: '#adc6ff' },
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Your Expenses</h1>
      <Row gutter={[16, 16]} justify="center">
        {categories.map((category) => (
          <Col key={category.key} xs={24} sm={12} md={6}>
            <Card
              style={{ backgroundColor: category.color, textAlign: 'center' }}
              onClick={() => navigate(`/history/${category.key}`)}
            >
              <h3>{category.label}</h3>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Dashboard;

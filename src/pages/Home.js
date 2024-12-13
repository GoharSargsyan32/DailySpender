import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'antd';


const categories = [
  { name: 'Food', icon: '🍴' },
  { name: 'Car', icon: '🚗' },
  { name: 'Leisure', icon: '🎉' },
  { name: 'Shopping', icon: '🛍️' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Row gutter={[16, 16]}>
      {categories.map((category) => (
        <Col key={category.name} span={6}>
          <Card
            onClick={() => navigate(`/history/${category.name.toLowerCase()}`)}
            hoverable
          >
            <div style={{ textAlign: 'center' }}>
              <h2>{category.icon}</h2>
              <p>{category.name}</p>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Home;

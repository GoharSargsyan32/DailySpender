import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import Home from './pages/Home';
import History from './pages/History';
import Login from './pages/Login';
import { auth } from './firebase';

const { Header, Content } = Layout;

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
  };

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <Layout>
        <Header style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>Spender App</div>
          <Button type="default" onClick={handleLogout}>
            Log Out
          </Button>
        </Header>
        <Content style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history/:category" element={<History />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;

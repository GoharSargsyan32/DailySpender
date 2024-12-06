import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { ROUTE_CONSTANTS } from "./core/utils/constants";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firbase";

const Layout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleLogin = () => {
    navigate(ROUTE_CONSTANTS.LOGIN);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <main>
      {!isAuthenticated ? (
        <Link to={ROUTE_CONSTANTS.LOGIN}>
          <Button
            onClick={handleLogin}
            type="primary"
          >
            Sign in
          </Button>
        </Link>
      ) : (
        <Button onClick={handleLogout} type="primary">
          Log out
        </Button>
      )}
      <Outlet />
    </main>
  );
};

export default Layout;

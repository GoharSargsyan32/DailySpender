import React from "react";
import MainLayout from "./components/MainLayout";
import { useEffect } from 'react';
import { Login, Register } from './components/auth';
import LoadingWrapper from './components/sheard/LoadingWrapper';
import { ROUTE_CONSTANTS } from './components/core/utils/constants';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileInfo } from './state-managment/slices/userProfile';
import Layout from "./components/Layout";



const App = () => {
  const dispatch = useDispatch();
  const { loading, authUserInfo: { isAuth } } = useSelector(store => store.userProfile);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(fetchUserProfileInfo());
  },[]);

  return (
    <LoadingWrapper loading={loading}>
        <RouterProvider
          router={
            createBrowserRouter(
              createRoutesFromElements(
                <Route path="/" element={<Layout />}>
                  <Route path={ROUTE_CONSTANTS.LOGIN}
                         element={isAuth ? <Navigate to={ROUTE_CONSTANTS.FORM}/> : <Login />}/>
                  <Route path={ROUTE_CONSTANTS.REGISTER}
                         element={isAuth ? <Navigate to={ROUTE_CONSTANTS.FORM}/> : <Register/>}/>
                  <Route path={ROUTE_CONSTANTS.FORM}
                         element={<MainLayout/>}/>                 
                </Route>
              )
            )
          }
        />
      </LoadingWrapper>
  );
};

export default App;

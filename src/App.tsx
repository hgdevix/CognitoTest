import React from 'react';
import logo from './logo.svg';
import { Amplify, Auth } from "aws-amplify";
import './App.css';

import ListToDos from './components/ListToDos';
import { COGNITO } from './configs/cognito';
import SignIn from './components/SignIn';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';

Amplify.configure({
  Auth: {
    region: COGNITO.REGION,
    userPoolId: COGNITO.USER_POOL_ID,
    userPoolWebClientId: COGNITO.APP_CLIENT_ID
  }
})

function App() {
  return (
    
    <React.StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/login" element={<SignIn/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './Pages/Login';
import RegistrationForm from './Pages/Registration';
import Dashboard from './Pages/Dashboard';
import ConfigurationPage from './Pages/ConfigurationPage';
import Home from './Pages/Home';
import Header from './Header';
import useToken from './useToken';


const App = () => {

    // const { token, setToken } = useToken();

    // if(!token) {
    //   return <>
    //   <Header></Header>
    //   <LoginForm setToken={setToken} /></>
    // }


    return (
        <BrowserRouter>
          {/* <Header/> */}
          <Routes>
            <Route path="/" element={<LoginForm/>} />
            {/* <Route path="/login" element={<LoginForm setToken={setToken}/>} /> */}
            <Route  path="/register" element={<RegistrationForm/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/configuration" element={<ConfigurationPage/>} />
          </Routes>
        </BrowserRouter>
      
  );
};

export default App;
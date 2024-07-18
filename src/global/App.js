import React from 'react';
import './App.css';
import Home from './Home';
import Register from '../auth/register';
import Login2 from '../auth/login2';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Beauticians2 from './beauticians2';
import ClientsList from './clients';
import ServicesList from './services';
import BeauticiansList from './beauticians';
import Clients2 from './clients2';
import Services2 from './services2';
import AddClient from './addClient';
import AddService from './addService';
import BusinessList from './business';
import Business2 from './business2';
import AddBusiness from './addBusiness';
import UpdateService from './updateService';
import UpdateBusiness from './updateBusiness';
import Logout from './logout';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login2" element={<Login2 />} />
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/services" element={<ServicesList />} />
        <Route path="/beauticians" element={<BeauticiansList />} />
        <Route path="/clients2" element={<Clients2 />} />
        <Route path="/beauticians2" element={<Beauticians2 />} />
        <Route path="/services2" element={<Services2 />} />
        <Route path="/addClient" element={<AddClient />} />
        <Route path="/addService" element={<AddService />} />
        <Route path="/business" element={<BusinessList/>}/>
        <Route path="/business2" element={<Business2 />} />
        <Route path="/addBusiness" element={<AddBusiness />} />
        <Route path="/updateService/:id" element={<UpdateService />} />
        <Route path="/updateBusiness/:business_id" element={<UpdateBusiness />} />
        <Route path="/logout" element={<Logout/>} />






      </Routes>
    </BrowserRouter>
  );
}

export default App;

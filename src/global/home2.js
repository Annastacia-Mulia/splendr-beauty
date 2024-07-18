import React, { useState } from 'react';
//import './App.css';
import Header from './header';
import Sidebar from './sidebar';
import Home from './Home';
import { BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
//import Register from './register';
//import Login2 from './src/login2';
import ClientsList from './clients';
import ServicesList from './services';
import BeauticiansList from './beauticians';
import Clients2 from './clients2';
function Home2() {


  return (
  
    <main className='main-container'>

<div className='main-title'>
  <h1 style={
    {
      color: '#fff',
    }
  }>SPLENDR ADMIN DASHBOARD</h1>
</div>

<div className='card-container'>
  <div className='card'>
    <div className='card-inner'>
      <Link to ="/clients2" className="btn btn-default border w-100" style={{ backgroundColor: "#0D6EFD", color: "white" }}>Clients Tab</Link>
      
      <BsPeopleFill className='card_icon' />
    </div>
  </div>

  <div className='card'>
    <div className='card-inner'>
    <Link to ="/services2" className="btn btn-default border w-100" style={{ backgroundColor: "#0D6EFD", color: "white" }}>Services Tab</Link>      <BsFillGrid3X3GapFill className='card_icon' />
    </div>
  </div>

  <div className='card'>
    <div className='card-inner'>
    <Link to ="/beauticians2" className="btn btn-default border w-100" style={{ backgroundColor: "#0D6EFD", color: "white" }}>Beauticians Tab</Link>
  
      <BsFillGrid3X3GapFill className='card_icon' />
    </div>
  </div>

  <div className='card'>
    <div className='card-inner'>
    <Link to ="/business2" className="btn btn-default border w-100" style={{ backgroundColor: "#0D6EFD", color: "white" }}>Businesses Tab</Link>
  
      <BsFillGrid3X3GapFill className='card_icon' />
    </div>
  </div>

</div>

</main>
  );
}
export default Home2;
import React,{useState} from 'react';
import ClientsList from './clients';
import ServicesList from './services';
import BeauticiansList from './beauticians';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import Home2 from './home2';

function Home() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home2/>
    </div>
  )
}


export default Home;

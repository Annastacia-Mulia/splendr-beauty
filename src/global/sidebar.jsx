import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> <h1>SPLENDR</h1>
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      <ul className='sidebar-list'>
        
        <li className='sidebar-list-item'>
          <Link to="/addService">
            <BsFillArchiveFill className='icon' /> Add Service
          </Link>
        </li>
        
        <li className='sidebar-list-item'>
          <Link to="/addBusiness">
            <BsFillGrid3X3GapFill className='icon' />Add a Business
          </Link>
        </li>

        <li className='sidebar-list-item'>
          <Link to="/logout">
            <BsFillGrid3X3GapFill className='icon' />Log Out
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

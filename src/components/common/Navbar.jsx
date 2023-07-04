import React, { useState } from 'react'
import '../../styles/Navbar.css'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarDate';
function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    
    <div className='relative'>
        <div className="menu">
            <Link to="#" className="menu-item-open">
              <span className="text-span" onClick={showSidebar}>MENU</span>
            </Link>
            
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <Link to='#' className='menu-item-close'>
                    <span className="text-span" onClick={showSidebar} >CLOSE</span>
              </Link>
              <ul className='nav-menu-items' >
                  {SidebarData.map((item, index) => {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path}>
                          
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                  })}
              </ul>
            </nav> 
      </div>
    </div>
  )
}

export default Navbar
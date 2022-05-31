import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SidebarData } from './SideBarData';
import './NavBar.css';
import { IconContext } from 'react-icons';
import { SidebarAdmin } from './SideBarAdmin';

const NavBar = ({currentUser}) => {

    const { isAuthenticated } = useAuth0();
    const [sidebar, setSidebar] = useState(false);

    const handleSidebarClick = () => {
        setSidebar(!sidebar);
    }

    const handleClickNotLoggedIn = () => {
        alert("Sign in for more options!")
    }

    if (!currentUser){
        return (
        <div className='header'>
        <IconContext.Provider value={{color: '#080808'}}>
            <div className='navbar'>
                <Link to="#" className="menu-bars">
                    <FaBars onClick={handleSidebarClick} />
                </Link>
            </div>

            <div className='title'>
                <h1 className='page-title'>This Time Mindfully</h1>
            </div>

            <div className='login'>
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>
        </IconContext.Provider>
        </div>
     
        )
    }

  return (
    <>
    <div className='header'>
        <IconContext.Provider value={{color: '#080808'}}>
            <div className='navbar'>
                <Link to="#" className="menu-bars">
                    <FaBars onClick={handleSidebarClick} />
                </Link>
            </div>
        </IconContext.Provider>
            <div className='title'>
                <h1 className='page-title'>This Time Mindfully</h1>
            </div>

            <div className='login'>
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>

        <IconContext.Provider value={{color: '#fff'}}>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={handleSidebarClick}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiOutlineClose />
                        </Link>
                    </li>


                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                    {currentUser.admin ? SidebarAdmin.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    }): null}
                    

                </ul>
            </nav>
            </IconContext.Provider>
        </div>
    </>
  )
}

export default NavBar
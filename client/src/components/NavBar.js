import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { FaBars } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import './NavBar.css';
import { IconContext } from 'react-icons';


const NavBar = ({currentUser, handleSidebarClick }) => {

    const { isAuthenticated } = useAuth0();
    

    

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
        </div>
    </>
  )
}

export default NavBar
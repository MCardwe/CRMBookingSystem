import React from 'react'
import { SidebarAdmin } from './SideBarAdmin';
import { useState } from 'react';
import { SidebarData } from './SideBarData';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

function SideBar({ sidebar, currentUser, handleSidebarClick }) {

    if(!currentUser){
        return 
    }

  return (
    <>
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
    </>
  )
}

export default SideBar
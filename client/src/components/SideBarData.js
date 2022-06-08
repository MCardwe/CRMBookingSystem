import React from 'react'

import { BsFillHouseDoorFill } from 'react-icons/bs';
import { AiFillBook, AiOutlineForm } from 'react-icons/ai';


export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <BsFillHouseDoorFill />,
        cName: 'nav-text'
    },
    {
        title: 'My Bookings',
        path: '/my_bookings',
        icon: <AiFillBook />,
        cName: 'nav-text'
    },
    {
        title: 'New Request',
        path: '/request_form',
        icon: <AiOutlineForm />,
        cName: 'nav-text'
    }
]
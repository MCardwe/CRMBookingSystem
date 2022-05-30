import React from 'react'

import { BsFillHouseDoorFill } from 'react-icons/bs';

export const SidebarAdmin = [
    {
        title: 'Pending Bookings',
        path: '/pending_bookings',
        icon: <BsFillHouseDoorFill />,
        cName: 'nav-text'
    },
    {
        title: 'All Bookings',
        path: '/all_bookings',
        icon: <BsFillHouseDoorFill />,
        cName: 'nav-text'
    },
    {
        title: 'Pending Users',
        path: '/pending_users',
        icon: <BsFillHouseDoorFill />,
        cName: 'nav-text'
    },
    {
        title: 'All Users',
        path: '/all_users',
        icon: <BsFillHouseDoorFill />,
        cName: 'nav-text'
    }
]
import React from 'react'

import { BsFillHouseDoorFill } from 'react-icons/bs';
import { MdOutlinePendingActions } from 'react-icons/md'
import { AiFillWallet } from 'react-icons/ai';
import { FaUserClock, FaUserFriends } from 'react-icons/fa';


export const SidebarAdmin = [
    {
        title: 'Pending Bookings',
        path: '/pending_bookings',
        icon: <MdOutlinePendingActions />,
        cName: 'nav-text'
    },
    {
        title: 'All Bookings',
        path: '/all_bookings',
        icon: <AiFillWallet />,
        cName: 'nav-text'
    },
    {
        title: 'Pending Users',
        path: '/pending_users',
        icon: <FaUserClock />,
        cName: 'nav-text'
    },
    {
        title: 'All Users',
        path: '/all_users',
        icon: <FaUserFriends />,
        cName: 'nav-text'
    }
]
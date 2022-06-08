import React, { useEffect, useState } from 'react'
import { getUsers } from '../api_services/UserDataService';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import AllUsersListItem from '../components/AllUsersListItem';
import { Button } from 'react-bootstrap';

function AllUsers({ currentUser }) {

    const [allUsers, setAllUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(currentUser){
            fetchAllUsers();
        }
    }, [currentUser])

    const fetchAllUsers = () => {
        setIsLoading(true);
        setTimeout(() => {

            getUsers()
            .then(data => {

                if (data){
                    setAllUsers(data);
                    setIsLoading(false);
                } else{
                    setIsLoading(false);
                }

            })

        }, [250])
    }

    const orderByApproved = (a, b) => {
        return (a.allowedToBook === b.allowedToBook)? 0 : a? 1 : -1;
    }

    const orderByAmountOfBookings = (a, b) => {
        if (b.bookings.length > a.bookings.length) {
            return 1;
        } else if (a.bookings.length > b.bookings.length) {
            return -1;
        }   else {
            return 0;
        }
    }

    const sortByApproved = () => {
        const newOrder = [...allUsers];
        setAllUsers(newOrder.sort(orderByApproved));
    }

    const sortByAmountOfBookings = () => {
        const newOrder = [...allUsers];
        setAllUsers(newOrder.sort(orderByAmountOfBookings));
    }

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: black;
    `;

    if (!allUsers){
        return <div className='pulse-loader'>
            <PulseLoader
            css={override}
            size={40}
            color={"#080808"}
            loading={isLoading} />
    </div>
    }

    const userNodes = allUsers.map((user, index) => {
        return <AllUsersListItem key={index} user={user} fetchAllUsers={fetchAllUsers}/>
    })

  return (
    <>
        <div className='all-booking-header'>
            <h2 className='listed-booking-title'>
                All Users
            </h2>
            <div className='booking-sort'>
                <h4 className='sort-title'>Sort by:</h4>
            
                <div>
                    <Button variant='outline-dark' className='sort-button' onClick={sortByApproved}>Approved</Button>
                    <Button variant='outline-dark' className='sort-button' onClick={sortByAmountOfBookings}>Bookings</Button>
                </div>
            </div>
        </div>
        <hr></hr>
        <div className='booking-list-container'>

        <img src={require('../static/image_31.png')} />


            {isLoading ? <div className='pulse-loader'>
                                <PulseLoader
                                css={override}
                                size={40}
                                color={"#080808"}
                                loading={isLoading} />
                        </div> 
                            :   userNodes}
        </div>
    </>
  )
}

export default AllUsers
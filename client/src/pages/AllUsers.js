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
        return <AllUsersListItem key={index} user={user} />
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
                    <Button variant='outline-dark' className='sort-button' >Approved</Button>
                    <Button variant='outline-dark' className='sort-button' >Bookings</Button>
                </div>
            </div>
        </div>
        <hr></hr>
        <br></br>
        <div className='booking-list-container'>
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
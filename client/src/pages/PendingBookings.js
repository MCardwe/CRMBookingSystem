import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { getAllPendingBookings } from '../api_services/BookingDataService';
import BookingListItem from '../components/BookingListItem';

function PendingBookings({ user }) {

    const [pendingBookings, setPendingBookings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPendingBookings();
    }, [])

    const fetchPendingBookings = () => {
        setIsLoading(true);
        setTimeout(() => {
            getAllPendingBookings().then(data => {
                
                if (data) {
                    setPendingBookings(data);
                    setIsLoading(false);
                } else {
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

    if (!pendingBookings){
    return <div className='pulse-loader'>
        <PulseLoader
        css={override}
        size={40}
        color={"#080808"}
        loading={isLoading} />
    </div>
    }


    const bookingNodes = pendingBookings.map((booking, index) => {
        return <BookingListItem key={index} booking={booking} />
    })


  return (
    <>
        <h2 className='listed-booking-title'>
                Bookings to confirm
            </h2>
            <hr></hr>
            <br></br>
    </>
  )
}

export default PendingBookings
import React, { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { deleteBooking, getAllPendingBookings, updateConfirmedBooking } from '../api_services/BookingDataService';
import PendingBookingItem from '../components/PendingBookingItem';

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

    const confirmBooking = (id) => {
        updateConfirmedBooking(id);
        fetchPendingBookings();
    }

    const denyBooking = (id) => {
        deleteBooking(id);
        fetchPendingBookings();
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
        return <PendingBookingItem key={index} booking={booking} confirmBooking={confirmBooking} denyBooking={denyBooking}/>
    })


  return (
    <>
        <h2 className='listed-booking-title'>
            Bookings To Confirm or Reject
        </h2>
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
                                : bookingNodes}
        </div>
    </>
  )
}

export default PendingBookings
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingListItem from '../components/BookingListItem';
import '../components/MyBooking.css';
import { getBookingsForUser } from '../api_services/BookingDataService';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

function MyBookings({ currentUser, handleBookingToEdit }) {


    const [userBookings, setUserBookings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (currentUser){
            fetchBookings();
        };
    
      }, [currentUser])

    const fetchBookings = () => {
    setIsLoading(true);
    setTimeout(() => {
        getBookingsForUser(currentUser.id)
        .then(data => {
            if (data) {
            setUserBookings(data.sort(orderByDate));
            setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });
    }, [500])
    }

    const orderByDate = (a, b) => {
        return new Date(a.date) - new Date(b.date);
    }

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: black;
        `;

    if (!userBookings){
    return <div className='pulse-loader'>
        <PulseLoader
        css={override}
        size={40}
        color={"#080808"}
        loading={isLoading} />
    </div>
    }


    const bookingNodes = userBookings.map((booking, index) => {
        return <BookingListItem 
            key={index}
            booking={booking}
            fetchBookings={fetchBookings}
            index={index}
            currentUser={currentUser}
            handleBookingToEdit={handleBookingToEdit}
            />
    });
    
  return (
    <>

        <h2 className='listed-booking-title'>
            Your Bookings
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
                            :   bookingNodes}
        </div>
    </>
  )
}

export default MyBookings
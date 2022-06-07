import React, { useState, useEffect } from 'react'
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { getBookings } from '../api_services/BookingDataService';
import AllBookingsListItem from '../components/AllBookingsListItem';
import { Button } from 'react-bootstrap';
import './AllBooking.css'

function AllBookings({ currentUser, handleBookingToEdit }) {

    const [allBookings, setAllBookings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if(currentUser){
            fetchAllBookings();
        }
        
    }, [currentUser])

    const fetchAllBookings = () => {
        setIsLoading(true);
        setTimeout(() => {
            getBookings()
            .then(data => {
                if (data){
                    const filteredBookings = data.filter((booking) => {
                        return booking.setupType != 'N/A';
                    })
                    setAllBookings(filteredBookings.sort(orderByDate))
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            }
            )
        }, [250])
    }

    const orderByDate = (a, b) => {
        return new Date(a.date) - new Date(b.date);
    }

    const orderByUserId = (a, b) => {
        if (a.user.id > b.user.id) {
            return 1;
        } else if (b.user.id > a.user.id) {
            return -1;
        }   else {
            return 0;
        }
    }

    const orderByConfirmed = (a, b) => {
        return (a.confirmed === b.confirmed)? 0 : a? -1 : 1;
    }


    const sortBookingsByUser = () => {
        const newOrder = [...allBookings];
        setAllBookings(newOrder.sort(orderByUserId));
    }

    const sortByDate= () => {
        const newOrder = [...allBookings];
        setAllBookings(newOrder.sort(orderByDate));
    }

    const sortByConfirmed = () => {
        const newOrder = [...allBookings];
        setAllBookings(newOrder.sort(orderByConfirmed));
    }

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: black;
    `;

    if (!allBookings){
        return <div className='pulse-loader'>
            <PulseLoader
            css={override}
            size={40}
            color={"#080808"}
            loading={isLoading} />
    </div>
    }

    const bookingNodes = allBookings.map((booking, index) => {
       return <AllBookingsListItem key={index} booking={booking} handleBookingToEdit={handleBookingToEdit}/>
    })

  return (
    <>
        <div className='all-booking-header'>
            <h2 className='listed-booking-title'>
                All Bookings
            </h2>
            <div className='booking-sort'>
                <h4 className='sort-title'>Sort by:</h4>
            
                <div>
                    <Button variant='outline-dark' className='sort-button' onClick={sortBookingsByUser}>Users</Button>
                    <Button variant='outline-dark' className='sort-button' onClick={sortByConfirmed}>Confirmed</Button>
                    <Button variant='outline-dark' className='sort-button' onClick={sortByDate}>Date</Button>
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
                            :   bookingNodes}
        </div>

    </>
  )
}

export default AllBookings
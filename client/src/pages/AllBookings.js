import React, { useState, useEffect } from 'react'
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { getBookings } from '../api_services/BookingDataService';
import AllBookingsListItem from '../components/AllBookingsListItem';
import { Button } from 'react-bootstrap';
import './AllBooking.css'

function AllBookings({ currentUser }) {

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
                    setAllBookings(data.sort(orderByDate))
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
       return <AllBookingsListItem key={index} booking={booking} />
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
                    <Button variant='outline-dark' className='sort-button'>Users</Button>
                    <Button variant='outline-dark' className='sort-button'>Confirmed</Button>
                    <Button variant='outline-dark' className='sort-button'>Date</Button>
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
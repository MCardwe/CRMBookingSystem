import React, { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { deleteBooking, getAllPendingBookings, updateConfirmedBooking } from '../api_services/BookingDataService';
import PendingBookingItem from '../components/PendingBookingItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                    const filteredBookings = data.filter((booking) => {
                        return booking.setupType != 'N/A';
                    })
                    setPendingBookings(filteredBookings.sort(orderByDate));
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }

            })
        }, [250])
        
    }

    const orderByDate = (a, b) => {
        return new Date(a.date) - new Date(b.date);
    }

    const confirmBooking = (id) => {
        updateConfirmedBooking(id);
        fetchPendingBookings();
        toast.success('Booking Confirmed!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const denyBooking = (id) => {
        deleteBooking(id);
        fetchPendingBookings();
        toast.error('Booking Rejected!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
        
        <div className='booking-list-container'>

        <img src={require('../static/image_31.png')} />


            {isLoading ? <div className='pulse-loader'>
                                <PulseLoader
                                css={override}
                                size={40}
                                color={"#080808"}
                                loading={isLoading} /> 
                                </div>
                                : bookingNodes}
        </div>

        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
    </>
  )
}

export default PendingBookings
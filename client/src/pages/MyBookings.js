import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingListItem from '../components/BookingListItem';
import '../components/MyBooking.css';
import { getBookingsForUser } from '../api_services/BookingDataService';

function MyBookings({ currentUser }) {


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
            setUserBookings(data);
            setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });
    }, [500])
    }

    if (!userBookings){
        return <h2>Loading...</h2>
    }


    const bookingNodes = userBookings.map((booking, index) => {
        return <BookingListItem 
            key={index}
            booking={booking}
            fetchBookings={fetchBookings}
            index={index}
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
            {isLoading ? <h2>Loading...</h2> : bookingNodes}
        </div>
    </>
  )
}

export default MyBookings
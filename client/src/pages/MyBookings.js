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
          getBookingsForUser(currentUser.id)
            .then(data => {
              if (data) {
                setUserBookings(data);
                setIsLoading(false);
              } else {
                  setIsLoading(false);
              }
            });
        };
    
      }, [currentUser])


    if (!userBookings){
        return <div>Loading...</div>
    }

    const updateCurrentUserBookings = (bookingIndex) => {
        userBookings.pop(bookingIndex);
    }
    

    const bookingNodes = userBookings.map((booking, index) => {
        return <BookingListItem 
            key={index}
            booking={booking}
            updateCurrentUserBookings={updateCurrentUserBookings}
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
            {/* {!isLoading && userBookings ? <h2>No bookings to see</h2>: null} */}
        </div>
    </>
  )
}

export default MyBookings
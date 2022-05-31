import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingListItem from '../components/BookingListItem';

function MyBookings({ currentUser }) {

    
    const bookingNodes = currentUser.bookings.map((booking, index) => {
        return <BookingListItem key={index} date={booking.date} timeSlot={booking.timeSlot} confirmed={booking.confirmed} host={booking.host} setupType={booking.setupType} />
    })


  return (
    <>

        <h2 className='listed-booking-title'>
            Your Bookings
        </h2>
        <hr></hr>
        <br></br>
        {bookingNodes}
    </>
  )
}

export default MyBookings
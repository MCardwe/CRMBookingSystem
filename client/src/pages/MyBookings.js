import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingListItem from '../components/BookingListItem';
import '../components/MyBooking.css';

function MyBookings({ user }) {

    if (!user){
        return <div>Loading...</div>
    }
    
    const bookingNodes = user.bookings.map((booking, index) => {
        return <BookingListItem key={index} date={booking.date} timeSlot={booking.timeSlot} confirmed={booking.confirmed} host={booking.host} setupType={booking.setupType} id={booking.id}/>
    });

    

  return (
    <>

        <h2 className='listed-booking-title'>
            Your Bookings
        </h2>
        <hr></hr>
        <br></br>
        <div className='booking-list-container'>
            {bookingNodes}
        </div>
    </>
  )
}

export default MyBookings
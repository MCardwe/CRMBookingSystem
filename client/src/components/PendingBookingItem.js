import React from 'react';
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TiTick } from 'react-icons/ti'
import { AiOutlineClose } from 'react-icons/ai';
import { deleteBooking } from '../api_services/BookingDataService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PendingBookingItem.css';

function PendingBookingItem({ booking, confirmBooking, denyBooking }) {

    const handleClickConfirm = () => {
        confirmBooking(booking.id);
    }

    const handleClickDeny = () => {
        denyBooking(booking.id);
    }

  return (
      <>
        <div className='pending-booking-item'>
            
            <Card>
                <Card.Header>{booking.user.name}, {booking.user.email} </Card.Header>
                <Card.Body>
                <Card.Title>Date - {booking.date}- Time Slot: {booking.timeSlot}</Card.Title>
                <hr></hr>
                <Card.Text>
                    Setup Type - {booking.setupType}
                </Card.Text>
                <Card.Text>
                    Host present? - {booking.host ? 'Yes' : 'No'}
                </Card.Text>
                <Card.Text>
                    Confidential? - {booking.confirmed ? 'Yes' : 'No'}
                </Card.Text>
                </Card.Body>
            </Card>
        </div>

        <div className='confirm-box'>
            <TiTick color='green' size={60} onClick={handleClickConfirm}/>
        </div>

        <div className='reject-box'>
            <AiOutlineClose color='red' size={60} onClick={handleClickDeny}/>
        </div>

        <ToastContainer
            position="bottom-right"
            autoClose={2000}
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

export default PendingBookingItem;
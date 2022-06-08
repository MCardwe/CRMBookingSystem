import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { TiTick } from 'react-icons/ti'
import { AiOutlineClose } from 'react-icons/ai';
import './AllBookingsListItem.css'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { deleteBooking } from '../api_services/BookingDataService';


function AllBookingsListItem({ booking, handleBookingToEdit, fetchAllBookings }) {

    const handleEditClick = () => {
        handleBookingToEdit(booking.id);
    }

    const handleClick = () => {
        deleteBooking(booking.id).then(
        toast.success('Booking deleted', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            }),
            fetchAllBookings()
        )
    }

  return (
<>
<div className='all-booking-item'>
    <Card>
        <Card.Header>{booking.date.toLocaleDateString()} - Time Slot: {booking.timeSlot}</Card.Header>
        <Card.Body>
            <Card.Title>Setup Type - {booking.setupType}</Card.Title>
            <hr></hr>
            <Card.Text>
                User - {booking.user.email}
            </Card.Text>
            <Card.Text>
            Host present? - {booking.host ? 'Yes' : 'No'}
            </Card.Text>
            <Card.Text>
            Confidential? - {booking.confirmed ? 'Yes' : 'No'}
            </Card.Text>
            <Card.Text className='space-between'>
                <div>
                    Confirmed? - {booking.confirmed ? <TiTick color='green'/> : <AiOutlineClose color='red'/>}
            </div>

            <div className='buttons'>
                <Button variant="dark" onClick={handleClick}>Cancel Booking</Button>
                <Link to='/edit_form'>
                    <Button className='cancel-button' variant="dark" onClick={handleEditClick}>Edit Booking</Button>
                </Link>
            </div>

            </Card.Text>
        </Card.Body>
        </Card>
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

export default AllBookingsListItem;
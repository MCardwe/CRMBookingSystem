import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { TiTick } from 'react-icons/ti'
import { AiOutlineClose } from 'react-icons/ai';
import './AllBookingsListItem.css'
import { Link } from 'react-router-dom';

function AllBookingsListItem({ booking, handleBookingToEdit }) {

    const handleEditClick = () => {
        handleBookingToEdit(booking.id);
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

            <Link to='/edit_form'>
                <Button className='cancel-button' variant="dark" onClick={handleEditClick}>Edit Booking</Button>
            </Link>

            </Card.Text>
        </Card.Body>
        </Card>
    </div>
</>
  )
}

export default AllBookingsListItem;
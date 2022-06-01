import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TiTick } from 'react-icons/ti'
import { AiOutlineClose } from 'react-icons/ai';
import { deleteBooking } from '../api_services/BookingDataService';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function BookingListItem({ booking, fetchBookings, index}) {

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
            fetchBookings()
        )
    }
    

  return (
    <div className='booking-item'>
        
        <Card>
            <Card.Header>{booking.date} - Time Slot: {booking.timeSlot}</Card.Header>
            <Card.Body>
              <Card.Title>Setup Type - {booking.setupType}</Card.Title>
              <hr></hr>
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
                <Button className='cancel-button' variant="dark" onClick={handleClick}>Cancel Booking</Button>
                
              </Card.Text>
            </Card.Body>
          </Card>

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
    </div>
  )
}

export default BookingListItem
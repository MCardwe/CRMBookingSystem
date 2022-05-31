import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TiTick } from 'react-icons/ti'
import { AiOutlineClose } from 'react-icons/ai';

function BookingListItem({ date, timeSlot, confirmed, host, setupType, user = null }) {



  return (
    <div className='booking-item'>
        
        <Card>
            <Card.Header>{date} - Time Slot: {timeSlot}</Card.Header>
            <Card.Body>
              <Card.Title>{setupType}</Card.Title>
              <Card.Text>
                Host present? - {host ? 'Yes' : 'No'}
              </Card.Text>
              <Card.Text>
                Confidential? - {confirmed ? 'Yes' : 'No'}
              </Card.Text>
              <Card.Text>
                Confirmed? - {confirmed ? <TiTick color='green'/> : <AiOutlineClose color='red'/>}
              </Card.Text>
            </Card.Body>
          </Card>

    </div>
  )
}

export default BookingListItem
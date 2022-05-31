import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function BookingListItem({ date, timeSlot, confirmed, host, setupType }) {



  return (
    <div>
        
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
                {confirmed ? 'Confirmed' : 'Pending Confirmation'}
              </Card.Text>
            </Card.Body>
          </Card>

    </div>
  )
}

export default BookingListItem
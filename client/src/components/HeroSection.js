import React from 'react'
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeroSection.css' 
import { Link } from 'react-router-dom';
import UserMessage from './UserMessage';

const HeroSection = ({currentUser}) => {


    
  return (
    <>
    <div className='hero-section'>

      <p className='main-page-title'>
        The therapy boat is ready for business! 
      </p>
      

      <div className='main-page-cards'>
        <div className='new-booking-card'>
          <Card as="h2">
            <Card.Body>
              <Card.Title as="h3" >New Bookings</Card.Title>
              <Card.Text as="h5">
                You must sign in before making a booking request.
              </Card.Text>
              {currentUser ? <Link to='/request_form'>
                <Button variant="dark">Booking Form</Button>
              </Link> : <Button variant="dark" disabled>Booking Form</Button>}
            </Card.Body>
          </Card>
        </div>

        <div className='new-booking-card'>
          <Card as="h2">
            <Card.Body>
              <Card.Title as="h3" >View your bookings</Card.Title>
              <Card.Text as="h5">
                Click here to view your pending/confirmed bookings.
              </Card.Text>
              {currentUser ? <Link to='/my_bookings'>
                <Button variant="dark">My Bookings</Button>
              </Link> : <Button variant="dark" disabled>My Bookings</Button>}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
    <div className='message-alert-hero'>
      <UserMessage currentUser={currentUser}/>
      </div>
    </>
  )
}

export default HeroSection
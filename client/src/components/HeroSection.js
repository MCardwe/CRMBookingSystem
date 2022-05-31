import React from 'react'
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeroSection.css' 
import { Link } from 'react-router-dom';

const HeroSection = () => {


    
  return (
    <div className='hero-section'>

      <p className='main-page-title'>
        The therapy boat is ready for business! 
      </p>

      <div className='new-booking-card'>
        <Card as="h2">
          <Card.Body>
            <Card.Title as="h3" >New Bookings</Card.Title>
            <Card.Text as="h5">
              Please sign in before making a booking request.
            </Card.Text>
            <Link to='/request_form'>
              <Button variant="dark">Booking Form</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>

    </div>
  )
}

export default HeroSection
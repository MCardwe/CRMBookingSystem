import React from 'react'
import { TiTick } from 'react-icons/ti'
import { AiOutlineClose } from 'react-icons/ai';
import './PendingBookingItem.css';
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function PendingUserItem({ user, approveUser, denyUser }) {

    const handleClickApprove = () => {
        approveUser(user.id);
    }

    const handleClickDeny = () => {
        denyUser(user.id)
    }

  return (

    <>
    <div className='pending-booking-item'>
            
            <Card>
                <Card.Header>Name - {user.name}</Card.Header>
                <Card.Body>
                <Card.Title>Email Address - {user.email}</Card.Title>
                </Card.Body>
            </Card>
        </div>

        <div className='confirm-box'>
            <TiTick color='green' size={60} onClick={handleClickApprove}/>
        </div>

        <div className='reject-box'>
            <AiOutlineClose color='red' size={60} onClick={handleClickDeny}/>
        </div>
    </>

  )
}

export default PendingUserItem
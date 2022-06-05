import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { TiTick } from 'react-icons/ti'
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


function AllUsersListItem({ user }) {

    const navigate = useNavigate();

    const handleBookingsClick = () => {
        navigate('/user_bookings', {state : user})
    }

  return (
    <>
        <div className='all-booking-item'>
            <Card>
                <Card.Header>{user.name}</Card.Header>
                <Card.Body>
                    <Card.Title>{user.email}</Card.Title>
                    <hr></hr>
                    <Card.Text>
                        <Button variant='outline-dark' onClick={handleBookingsClick}>Bookings:</Button> &nbsp; {user.bookings.length}
                    </Card.Text>
                    <Card.Text>
                    
                    </Card.Text>
                    <Card.Text>
                    
                    </Card.Text>
                    <Card.Text className='space-between'>
                        <div>
                            Approved? - {user.allowedToBook ? <TiTick color='green'/> : <AiOutlineClose color='red'/>}
                    </div>

                        <Button className='cancel-button' variant="dark" >Delete User</Button>

                    </Card.Text>
                </Card.Body>
                </Card>
            </div>
    </>
  )
}

export default AllUsersListItem
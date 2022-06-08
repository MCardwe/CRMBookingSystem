import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { TiTick } from 'react-icons/ti'
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../api_services/UserDataService';
import { ToastContainer, toast } from 'react-toastify';


function AllUsersListItem({ user, fetchAllUsers }) {

    const navigate = useNavigate();

    const handleBookingsClick = () => {
        navigate('/user_bookings', {state : user})
    }

    const handleDeleteClick = () => {
        deleteUser(user.id).then(
        toast.success('User deleted', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            }),
            fetchAllUsers()
        )
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

                        <Button className='cancel-button' variant="dark" onClick={handleDeleteClick}>Delete User</Button>

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

export default AllUsersListItem
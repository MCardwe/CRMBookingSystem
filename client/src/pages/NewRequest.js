import React from 'react'
import RequestForm from '../components/RequestForm'

function NewRequest({ user }) {



    if (!user){
        return <div>Loading...</div>
    }

  return (
    <>
        <h2 className='listed-booking-title'>
            New Booking
        </h2>
        <hr></hr>
        <RequestForm user={user}/>

    </>
  )
}

export default NewRequest
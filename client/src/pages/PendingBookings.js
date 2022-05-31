import React from 'react'
import { Navigate } from 'react-router-dom'

function PendingBookings({ user }) {

  if (!user){
    return <div>Authenticating...</div>
}

  return (
    <div>PendingBookings</div>
  )
}

export default PendingBookings
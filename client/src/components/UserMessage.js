import React from 'react'
import Alert from 'react-bootstrap/Alert'

function UserMessage({ currentUser }) {


    if(!currentUser){
        return <Alert variant='primary'>Sign in to send a new account request to an Admin!</Alert>
    }

  return (
    <>
        {currentUser.allowedToBook ? <Alert variant='success'>Account verified!</Alert> : <Alert variant='danger'>Account not yet verified. Awaiting admin permission to use system.</Alert>}
    </>
  )
}

export default UserMessage;
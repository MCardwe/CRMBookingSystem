import React from 'react'
import RequestForm from '../components/RequestForm'

function NewRequest({ user }) {



    if (!user){
        return <div>Loading...</div>
    }

  return (
    <>

        <RequestForm user={user}/>

    </>
  )
}

export default NewRequest
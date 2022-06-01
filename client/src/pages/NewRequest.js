import React, { useState } from 'react'
import RequestForm from '../components/RequestForm'
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

function NewRequest({ user }) {

    const [isLoading, setIsLoading] = useState(true)

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: black;
        `;

    if (!user){
    return <div className='pulse-loader'>
        <PulseLoader
        css={override}
        size={40}
        color={"#080808"}
        loading={isLoading} />
    </div>
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
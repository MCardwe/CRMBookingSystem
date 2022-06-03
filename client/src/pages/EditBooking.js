import React, { useState } from 'react'
import RequestForm from '../components/RequestForm'
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import EditForm from '../components/EditForm';

function EditBooking({ booking }) {

    const [isLoading, setIsLoading] = useState(true)

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: black;
        `;

    if (!booking){
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
            Edit Booking
        </h2>
        <hr></hr>
        <EditForm booking={booking}/>

    </>
  )
}

export default EditBooking;
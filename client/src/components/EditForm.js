import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'react-calendar/dist/Calendar.css';
import './RequestForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllBookedDates, postBooking } from '../api_services/BookingDataService';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { updateBooking } from '../api_services/BookingDataService';
import { Link } from 'react-router-dom';

function EditForm({ booking }) {

    const [date, setDate] = useState();
    const [timeSlot, setTimeSlot] = useState(booking.timeSlot);
    const [host, setHost] = useState(booking.host);
    const [setupType, setSetupType] = useState(booking.setupType);
    const [confidential, setConfidential] = useState(booking.confidential);
    const [disabledDates, setDisabledDates] = useState(null)
    const [fetchLoading, setFetchLoading] = useState(true);

    // Fetch to get dates that need to be disabled on the calendar
    useEffect(() => {
        fetchAndSetDisabledDates();
    }, [])

    const fetchAndSetDisabledDates = () => {
        setFetchLoading(true);
        setTimeout(() => {
            getAllBookedDates()
            .then(data => {
                setDisabledDates(data)
                setFetchLoading(false)
            })
        }, 250)
            
    }

    // If the fetch hasnt finished then the calendar and form are not shown
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: black;
        `;

    if (!disabledDates){
    return <div className='pulse-loader'>
        <PulseLoader
        css={override}
        size={40}
        color={"#080808"}
        loading={fetchLoading} />
    </div>
    }

    // function to reformat the date into a useable and saveble way
    const formatDate = (date) => {
        return date.toISOString();
    };


    // Collection of handle functions to handle the form value submitions
    const handleTimeSlot = (event) => {
        setTimeSlot(event.target.value);
    }

    const handleHost = () => {
        setHost(!host)
    }

    const handleSetupType = (event) => {
        setSetupType(event.target.value);
    }

    const handleConfidential = () => {
        setConfidential(!confidential);
    }

    // Submit function to send all form data to the database
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!date) {
            toast.error('Please Select A Date.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return 
        }
        
        const newBookingObject = {
            user: booking.user,
            date: formatDate(date),
            timeSlot: timeSlot,
            host: host,
            setupType: setupType,
            confidential: confidential 
        };
        
        updateBooking(newBookingObject, booking.id).then(
            toast.success('Booking Updated!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }),
        );
        
        setDate(null);

        fetchAndSetDisabledDates();
    }

  return (
    <>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />

        <div className='form-container'>
            <div className='calender-container'>
                <Calendar 
                    onChange={setDate} 
                    value={date}
                    minDate={new Date()}
                    tileDisabled={({date, view}) => //This disables the tiles for the days that have already been booked
                    (view === 'month') && 
                    disabledDates.some(disabledDate =>
                      date.getDate() === disabledDate.getDate()
                    )}
                    />
            </div>
            
            <Form onSubmit={handleSubmit} className="booking-form">
                <Form.Group className="mb-3" controlId="formTimeSlot">
                    <Form.Label>Time Slot</Form.Label>
                    <Form.Select onChange={handleTimeSlot} id="timeSlot" required>
                        <option value={timeSlot} selected>{timeSlot}</option>
                        <option value="8-12">8am - 12pm</option>
                        <option value="1-5">1pm - 5pm</option>
                        <option value="6-10">6pm - 10pm</option>
                        <option value="Full Day">Full Day</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formHost">
                    <Form.Check type="checkbox" id="host" value={host} checked={host} onChange={handleHost}label="Host/Helmsman Needed?" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSetupType">
                    <Form.Label>Setup Type</Form.Label>
                    <Form.Select onChange={handleSetupType} id="setupType" required>
                        <option value={setupType} selected>{setupType}</option>
                        <option value="Group space open floor">Group space open floor</option>
                        <option value="Group space table and chairs">Group space table and chairs</option>
                        <option value="One to one therapy space">One to one therapy space</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfidential">
                    <Form.Check type="checkbox" id="confidential" value={confidential} checked={confidential} onChange={handleConfidential}label="Is this a confidential booking?" />
                    <Form.Text className="text-muted">
                        Dont worry, I'll never release booking information. If you have any questions just call.
                    </Form.Text>
                </Form.Group>

                <Link to='/all_bookings'>
                    <Button variant="dark" type="submit">Submit</Button>
                </Link>

            </Form>

        </div>

        <ToastContainer
                position="bottom-right"
                autoClose={3000}
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
export default EditForm;
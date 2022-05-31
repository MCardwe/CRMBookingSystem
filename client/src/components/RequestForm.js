import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './RequestForm.css';

function RequestForm() {

    const [date, setdate] = useState(new Date());

    

  return (
    <>
        <div className='form-container'>
            <div className='calender-container'>
                <Calendar 
                    onChange={setdate} 
                    value={date}
                    minDate={new Date()}
                    />
            </div>
            
        </div>
    </>
  )
}

export default RequestForm
import React, { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPendingUsers, deleteUser, updateApprovedUser } from '../api_services/UserDataService';
import PendingUserItem from '../components/PendingUserItem';


function PendingUsers() {

    const [allPendingUsers, setAllPendingUsers] = useState(null);
    const [isLoading, setIsLoading]= useState(true);

    useEffect(() => {
        fetchAllPendingUsers();
    }, [])

    const fetchAllPendingUsers = () => {
        setIsLoading(true);
        setTimeout(() => {
            getPendingUsers()
                .then(data => {
                    if (data) {
                        setAllPendingUsers(data);
                    } 
                    setIsLoading(false);
                })
        }, [250])
    }

    const approveUser = (id) => {
        updateApprovedUser(id);
        fetchAllPendingUsers();
        toast.success('User Approved!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const denyUser = (id) => {
        deleteUser(id);
        fetchAllPendingUsers();
        toast.error('User Denied!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    const override = css`
        display: block;
        margin: 0 auto;
        border-color: black;
    `;

    if (!allPendingUsers){
        return <div className='pulse-loader'>
            <PulseLoader
            css={override}
            size={40}
            color={"#080808"}
            loading={isLoading} />
        </div>
    }

    const userNodes = allPendingUsers.map((user, index) => {
        return <PendingUserItem key={index} user={user} approveUser={approveUser} denyUser={denyUser}/>
    })

  return (
    <>
        <h2 className='listed-booking-title'>
            Users To Approve or Deny Access
        </h2>
        <hr></hr>
        
        <div className='booking-list-container'>

        <img src={require('../static/image_31.png')} />


            {isLoading ? <div className='pulse-loader'>
                                <PulseLoader
                                css={override}
                                size={40}
                                color={"#080808"}
                                loading={isLoading} /> 
                                </div>
                                : userNodes}
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

export default PendingUsers;
import './App.css';
import { useState, useEffect } from 'react';
import { getUserByEmail, postUser, updateUser } from './api_services/UserDataService';
import { useAuth0 } from '@auth0/auth0-react'
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyBookings from './pages/MyBookings';
import NewRequest from './pages/NewRequest';
import PendingBookings from './pages/PendingBookings';
import AllBookings from './pages/AllBookings';
import AllUsers from './pages/AllUsers';
import ProtectedRoutes from './protected_routes/ProtectedRoutes';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [isPending, setIsPending] = useState(true);

  // Bringing in ability to access Auth0 user

  const { user } = useAuth0();

  // Initial fetch to set up current user
  useEffect(() => {

      if (user){
        getUserByEmail(user.email)
          .then(data => {

            // writing function so if there is no data recieved, create a new user.
            if (!data[0]){
              postUser(createUserObject(user.email, user.name))
              .then(newData => {
                setIsPending(false)
                setCurrentUser(newData[0]);
              });
            } else {
              setCurrentUser(data[0]);
            }
            
          })
      }
    }, [user]);

  const createUserObject = (userEmail, usersName) => {
    return {
      email: userEmail,
      name: usersName
    }
  }



  return (
    <>
      <Router>
        <NavBar currentUser={currentUser}/>
        <Routes>
          <Route path='/' exact element={<HeroSection/>}/>
          <Route path='/my_bookings' exact element={<MyBookings currentUser={currentUser}/>}/>
          <Route path='/request_form' element={<NewRequest/>}/>
            <Route 
              path='/pending_bookings'
                element={
                  <ProtectedRoutes user={currentUser}>
                    <PendingBookings />
                  </ProtectedRoutes>
                }
            />
            <Route 
              path='/all_bookings'
                element={
                  <ProtectedRoutes user={currentUser}>
                    <AllBookings />
                  </ProtectedRoutes>
                }
            />
            <Route 
              path='/pending_users'
                element={
                  <ProtectedRoutes user={currentUser}>
                    <PendingBookings />
                  </ProtectedRoutes>
                }
            />
            <Route 
              path='/all_users'
                element={
                  <ProtectedRoutes user={currentUser}>
                    <AllUsers />
                  </ProtectedRoutes>
                }
            />
        </Routes>
      </Router>
    </>
  );
}

export default App;

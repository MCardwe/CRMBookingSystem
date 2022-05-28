import './App.css';
import { useState, useEffect } from 'react';
import { getUserByEmail, postUser, updateUser } from './api_services/UserDataService';
import { postBooking, updateBooking, deleteBooking } from './api_services/BookingDataService';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react'

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  // Bringing in ability to access Auth0 user

  const { user } = useAuth0();

  // Initial fetch to set up current user
  useEffect(() => {

      if (user){
        getUserByEmail(user.email)
          .then(data => {
            console.log(data);

            // writing function so if there is no data recieved, create a new user.
            if (!data[0]){
              postUser(createUserObject(user.email, user.name))
              .then(newData => {
                console.log(newData);
                setCurrentUser(newData);
              });
            } else {
              setCurrentUser(data);
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
    <div className="App">
      <h2>Hello</h2>
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;

import './App.css';
import { useState, useEffect } from 'react';
import { postUser, updateUser } from './api_services/UserDataService';
import { postBooking, updateBooking, deleteBooking } from './api_services/BookingDataService';

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  // Initial ferch to set up current user permissions
  useEffect(() => {
    fetch("http://localhost:8080/users/1")
    .then(res => { 
      return res.json();
    })
    .then(data => setCurrentUser(data));
  }, []);




  //Test to see if the create user function works with database

  const handleCLick = () => {
    deleteBooking(3);

    // updateBooking({
    //     date: "20/10/00",
    //     host: true,
    //     setupType: "one to one therapy space",
    //     confidential: true,
    //     confirmed: false,
    //     user: currentUser
    //   }, 3);

    // postBooking({
    //   date: "20/10/00",
    //   host: true,
    //   setupType: "one to one therapy space",
    //   confidential: true,
    //   confirmed: true,
    //   user: currentUser
    // })

    // updateUser({
    //   email: "fakeemail@gmail.com",
    //   name: "FAKENAME",
    //   admin: false,
    //   allowedToBook: true
    // }, 3);
    // postUser({
    //   email: "fakeemail@gmail.com",
    //   name: "fakename",
    //   admin: false,
    //   allowedToBook: true
    // });
  }

  return (
    <div className="App">
      <h2>Hello</h2>
      <button onClick={handleCLick}>Click</button>
    </div>
  );
}

export default App;

import './App.css';
import { useState, useEffect } from 'react';
import { postUser, updateUser } from './api_services/UserDataService';
import { postBooking, updateBooking, deleteBooking } from './api_services/BookingDataService';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

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



  return (
    <div className="App">
      <h2>Hello</h2>
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;

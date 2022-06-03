import "./App.css";
import { useState, useEffect } from "react";
import {
  getUserByEmail,
  postUser,
  updateUser,
} from "./api_services/UserDataService";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyBookings from "./pages/MyBookings";
import NewRequest from "./pages/NewRequest";
import PendingBookings from "./pages/PendingBookings";
import AllBookings from "./pages/AllBookings";
import AllUsers from "./pages/AllUsers";
import ProtectedRoutesAdmin from "./protected_routes/ProtectedRoutesAdmin";
import ProtectedRoutesUser from "./protected_routes/ProtectedRoutesUser";
import SideBar from "./components/SideBar";
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import EditBooking from "./pages/EditBooking";
import { getBooking } from "./api_services/BookingDataService";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState(null)

  // Bringing in ability to access Auth0 user

  const { user } = useAuth0();

  // Initial fetch to set up current user
  useEffect(() => {
    if (user) {
      getUserByEmail(user.email).then((data) => {
        // writing function so if there is no data recieved, create a new user.
        if (!data[0]) {
          postUser(createUserObject(user.email, user.name)).then((newData) => {
            setIsPending(false);
            setCurrentUser(newData[0]);
          });
        } else {
          setCurrentUser(data[0]);
          setIsPending(false);
        }
      });
    }
  }, [user]);

  const createUserObject = (userEmail, usersName) => {
    return {
      email: userEmail,
      name: usersName,
    };
  };

  const handleSidebarClick = () => {
    setSidebar(!sidebar);
  };

  const handleIsPending = () => {
    setIsPending(true);
  };

  const handleBookingToEdit = (bookingId) => {
    setBookingToEdit(null);
      getBooking(bookingId).then(
        data => {

          console.log(data)
          if (data){
            setBookingToEdit(data)
          }
        }
      )
  }


  return (
    <>
      <Router>
        <NavBar
          currentUser={currentUser}
          handleSidebarClick={handleSidebarClick}
        />
        <Routes>
          <Route
            path="/"
            exact
            element={<HeroSection currentUser={currentUser} />}
          />

          <Route
            path="/my_bookings"
            element={
              <ProtectedRoutesUser user={currentUser}>
                <MyBookings currentUser={currentUser} />
              </ProtectedRoutesUser>
            }
          />

          <Route
            path="/request_form"
            element={
              <ProtectedRoutesUser user={currentUser}>
                <NewRequest user={currentUser} />
              </ProtectedRoutesUser>
            }
          />

          <Route
            path="/pending_bookings"
            element={
              <ProtectedRoutesAdmin user={currentUser}>
                <PendingBookings />
              </ProtectedRoutesAdmin>
            }
          />
          <Route
            path="/all_bookings"
            element={
              <ProtectedRoutesAdmin user={currentUser}>
                <AllBookings currentUser={currentUser} handleBookingToEdit={handleBookingToEdit}/>
              </ProtectedRoutesAdmin>
            }
          />
          <Route
            path="/pending_users"
            element={
              <ProtectedRoutesAdmin user={currentUser}>
                <PendingBookings />
              </ProtectedRoutesAdmin>
            }
          />
          <Route
            path="/all_users"
            element={
              <ProtectedRoutesAdmin user={currentUser}>
                <AllUsers />
              </ProtectedRoutesAdmin>
            }
          />
          <Route
            path='/edit_form'
            element={
              <ProtectedRoutesAdmin user={currentUser}>
                <EditBooking booking={bookingToEdit} />
              </ProtectedRoutesAdmin>
            }
          />
        </Routes>
        <SideBar
          sidebar={sidebar}
          currentUser={currentUser}
          handleSidebarClick={handleSidebarClick}
        />
      </Router>
    </>
  );
}

export default App;

const baseBookingUrl = "http://localhost:8080/bookings";

export const getBookings = () => {
    return fetch(baseBookingUrl).then(res => {return res.json()});
};

export const postBooking = (payload) => {
    return fetch(baseBookingUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { 
            "Accept" : "application/json",
            "Content-Type": "application/json" 
        }
      }).then((res) => res.json());
}

export const updateBooking = (payload, id) => {
    return fetch(baseBookingUrl + `/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
    }).then((res) => res.json());
}

export const deleteBooking = (id) => {
    return fetch(baseBookingUrl + `/${id}`, {
        method: "DELETE",
    })
}
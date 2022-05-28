const baseUserUrl = "http://localhost:8080/users";

export const getUsers = () => {
    return fetch(baseUserUrl).then(res => {return res.json()});
};

export const getUserByEmail = (email) => {
    return fetch(baseUserUrl + `/?email=${email}`)
        .then(res => res.json());
}

export const postUser = (payload) => {
    return fetch(baseUserUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { 
            "Accept" : "application/json",
            "Content-Type": "application/json" 
        }
      }).then((res) => res.json());
}

export const updateUser = (payload, id) => {
    return fetch(baseUserUrl + `/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
    }).then((res) => res.json());
}
import axios from "axios";

const getFromLFMApi = (path) => {
    return get(`http://localhost:8080/${path}`);
}

const logInToLFM = (userEmail, userPassword) => {
    return axios({
        method: 'post',
        url: "http://localhost:8080/login",
        auth: {
            username: userEmail,
            password: userPassword
        }
    })
}

const get = (fullPath) => {
    return axios({
        method: 'get',
        url: fullPath,
    }).then(response => response.data);
}

export {get, getFromLFMApi, logInToLFM}
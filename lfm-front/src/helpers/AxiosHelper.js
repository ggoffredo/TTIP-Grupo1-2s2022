import axios from "axios";

const getFromLFMApi = (path) => {
    return get(`${process.env.REACT_APP_BACKEND_API}${path}`);
}

const logInToLFM = (userEmail, userPassword) => {
    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND_API}login`,
        auth: {
            username: userEmail,
            password: userPassword
        }
    })
}

const registerToLFM = (userName, userLastname, userEmail, userPassword) => {
    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND_API}register`,
        data: {
            nombre: userName,
            apellido: userLastname,
            email: userEmail,
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

export {get, getFromLFMApi, logInToLFM, registerToLFM}
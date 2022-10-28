import axios from "axios";

const getFromLFMApi = (path, params) => {
    return get(`${process.env.REACT_APP_BACKEND_API}${path}`, params);
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

const get = (fullPath, params) => {
    return axios({
        method: 'get',
        url: fullPath,
        params: {
            ...params
        }
    }).then(response => response.data);
}

export {get, getFromLFMApi, logInToLFM, registerToLFM}
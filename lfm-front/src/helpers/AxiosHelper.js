import axios from "axios";

const getFromLFMApi = (path, params, body) => {
    return body && Object.keys(body).length !== 0
        ? post(`${process.env.REACT_APP_BACKEND_API}${path}`, body, params)
        : get(`${process.env.REACT_APP_BACKEND_API}${path}`, params)
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

const post = (fullPath, body, params) => {
    return axios({
        method: 'post',
        url: fullPath,
        data: {
            ...body
        },
        params: {
            ...params
        }
    }).then(response => response.data);
}

export {get, getFromLFMApi, logInToLFM, registerToLFM}
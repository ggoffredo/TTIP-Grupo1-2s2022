import axios from "axios";

const getFromLFMApi = (path) => {
    return get(`http://localhost:8080/${path}`);
}

const get = (fullPath) => {
    return axios({
        method: 'get',
        url: fullPath,
    }).then(response => response.data);
}

export {get, getFromLFMApi}
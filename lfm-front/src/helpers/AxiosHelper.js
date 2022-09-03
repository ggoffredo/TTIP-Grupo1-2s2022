import axios from "axios";

const get = (path) => {
    return axios({
        method: 'get',
        url: `http://localhost:8080/${path}`,
        responseType: 'stream',
    }).then(response => response.data);
}

export {get}
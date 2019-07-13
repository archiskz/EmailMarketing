import * as Config from './../constants/Config';
import axios from 'axios';
export default function callApi(endpoint, method = 'GET', body){
    return axios({
        method: 'get',
        url: `${Config.API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
}
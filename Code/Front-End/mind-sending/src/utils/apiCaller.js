import * as Config from './../constants/Config';
import axios from 'axios';
export async function callApi(endpoint, method = 'GET', body){
    return axios({
        method: 'get',
        url: `${Config.API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
}
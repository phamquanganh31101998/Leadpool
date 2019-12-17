import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'


export default {
    loginWithPass, requestForgotPassword
}

function loginWithPass(body){
    let headers = authHeader();
    headers['Content-Type'] = 'application/json';
    let request = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
        // mode: 'cors', // no-cors, cors, *same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // no-referrer, *client
    }
    let endpoint = `${config.authUrl}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function requestForgotPassword(email){
    let headers = authHeader();
    headers['Content-Type'] = 'application/json';
    let request = {
        method: 'POST',
        body: email,
        headers: headers,
    }
    let endpoint = `${config.apiUrl}auth/request-reset-password`
    return responseService.fetchRetry(endpoint, request, 1)
}
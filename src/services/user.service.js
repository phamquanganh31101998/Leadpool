import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs');

export default {
    getMyInfo, updatePassword, inviteUserNormal,
    signUp,
}

function getMyInfo(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/whoami`
    return responseService.fetchRetry(endpoint, request, 1)
}

function updatePassword(idAccount, body){
    let request = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/changePass`
    return responseService.fetchRetry(endpoint, request, 1)
}

function inviteUserNormal(idAccount, body){
    let request = {
        method: 'POST',
        headers: authHeader(), 
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/invite-signup`
    return responseService.fetchRetry(endpoint, request, 1)
}

function signUp(idAccount, body){
    let param = {
        account: idAccount
    }
    let _qs = qs.stringify(param);
    let request = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let endpoint = `${config.apiUrl}auth/signup/?${_qs}`
    console.log(endpoint)
    return responseService.fetchRetry(endpoint, request, 1)
}
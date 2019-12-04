import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default {
    getMyInfo, updatePassword
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
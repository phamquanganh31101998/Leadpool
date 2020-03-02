import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default {
    getListGbtn,createGbtn,updateGbtn,deleteGbtn,getInfoBtn,getInfoBtnForOrderWeb
}

function getListGbtn(accountId) {
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${accountId}/group-buttons`
    return responseService.fetchRetry(endpoint, request, 1)
}
function createGbtn(accountId,body) {
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${accountId}/group-buttons`
    return responseService.fetchRetry(endpoint, request, 1)
}
function updateGbtn(accountId,body) {
    let request = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${accountId}/group-buttons`
    return responseService.fetchRetry(endpoint, request, 1)
}
function deleteGbtn(accountId,gBtnId) {
    let request = {
        method: 'DELETE',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${accountId}/group-buttons/${gBtnId}`
    return responseService.fetchRetry(endpoint, request, 1)
}
function getInfoBtn(accountId,gBtnId) {
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${accountId}/group-buttons/${gBtnId}`
    return responseService.fetchRetry(endpoint, request, 1)
}
function getInfoBtnForOrderWeb(accountId,gBtnId) {
    let header ={
        'Accept': 'application/json',
		'Content-Type': 'application/json'
    }
    let request = {
        method: 'GET',
        headers: header
    }
    let endpoint = `${process.env.VUE_APP_API_URL}/leadhub/account/${accountId}/group-buttons${gBtnId}`
    return responseService.fetchRetry(endpoint, request, 1)
}
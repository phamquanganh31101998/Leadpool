import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs');

export default {
    getListGbtn,createGbtn,updateGbtn,deleteGbtn,getInfoBtn,getInfoBtnForOrderWeb, getTracking
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

function getTracking(accId, sortBy, orderBy, page){
    let a = {
        page: page
    }
    if (sortBy != '' && sortBy != null && sortBy != undefined){
        a.sortBy = sortBy
    }
    if (orderBy != '' && orderBy != null && orderBy != undefined){
        a.orderBy = orderBy
    }
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let _qs = qs.stringify(a);
    let endpoint = `${config.apiContact}/${accId}/leadhub/get-tracking?${_qs}` 
    return responseService.fetchRetry(endpoint, request, 1)
}
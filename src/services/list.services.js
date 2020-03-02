import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs');

export default {
    getList, findContactByCondition, getContactByListId, 
    createNewList, updateList, deleteList
}

function getList(idAccount) {
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/condition-group`
    return responseService.fetchRetry(endpoint, request, 1)
}

function findContactByCondition(idAccount, condition, page){
    let a = {
        page: page
    }
    let _qs = qs.stringify(a);
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(condition)
    }
    let endpoint = `${config.apiContact}/${idAccount}/get-contact-condition?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getContactByListId(idAccount, idList, page){
    let a = {
        page: page
    }
    let _qs = qs.stringify(a);
    let request = {
        method: 'GET',
        headers: authHeader(),
    }
    let endpoint = `${config.apiContact}/${idAccount}/get-contact-condition/${idList}?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createNewList(idAccount, body){
    
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/condition-group`
    return responseService.fetchRetry(endpoint, request, 1)
}

function updateList(idAccount, body){
    let request = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/condition-group`
    return responseService.fetchRetry(endpoint, request, 1)
}

function deleteList(idAccount, idList){
    let request = {
        method: 'DELETE',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/condition-group/${idList}`
    return responseService.fetchRetry(endpoint, request, 1)
}
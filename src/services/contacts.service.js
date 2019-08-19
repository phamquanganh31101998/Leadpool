import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs');

export default {
    createContact, getAllContact, getdetailContact, deleteContact
}

function createContact(id,data) {
    
    let body = {
        properties: data
    }
    let request = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${id}/contacts`
    return responseService.fetchRetry(endpoint, request, 1)
}
function getAllContact(id, page) {
    let a = {
        page: page
    }
    let request ={
        method: 'GET',
        headers: authHeader()
    }
    let _qs = qs.stringify(a);
    let endpoint = `${config.apiContact}/${id}/contacts?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}
function getdetailContact(idAccount,idContact){
    let request ={
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contacts/${idContact}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function deleteContact(idAccount, idContact){
    let request = {
        method: 'DELETE',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contacts/${idContact}`
    return responseService.fetchRetry(endpoint, request, 1)
}
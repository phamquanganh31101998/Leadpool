import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs');

export default {
    createDeal, getAllEmail, getDealByAccount,
    updateDeal, deleteDeal, getDealByContact,
    searchContactForDeal
}
function getAllEmail(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/getAllEmail`
    return responseService.fetchRetry(endpoint, request, 5)
}
function createDeal(idAccount, body){
    let request = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/deals`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getDealByAccount(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/deals/account-deals`
    return responseService.fetchRetry(endpoint, request, 1)
}

function updateDeal(idAccount, body){
    let request = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/deals`
    return responseService.fetchRetry(endpoint, request, 1)
}

function deleteDeal(idAccount, idDeal){
    let request = {
        method: 'DELETE',
        headers: authHeader(),
    }
    let endpoint = `${config.apiContact}/${idAccount}/deals/${idDeal}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getDealByContact(idAccount, idContact){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/deals/contact/${idContact}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function searchContactForDeal(idAccount, keyword){
    let a = {
        keyword: keyword
    }
    let _qs = qs.stringify(a);
    let request ={
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contacts/search-for-deal?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}
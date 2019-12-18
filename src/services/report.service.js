import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs');

export default {
    getContactPerMonth, getContactPerStaff, getContactPerStaffDetail,
    getContactRegularlyCare, getDealAmountStaff
}

function getContactPerMonth(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contacts/contactPermonth`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getContactPerStaff(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contacts/contactPerStaff`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getContactPerStaffDetail(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contacts/owner-leadstatus`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getContactRegularlyCare(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contacts/regularly-care`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getDealAmountStaff(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/deals/amount-staff`
    return responseService.fetchRetry(endpoint, request, 1)
}
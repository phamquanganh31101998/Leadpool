import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs');

export default {
    getContactPerMonth, getContactPerStaff, getContactPerStaffDetail,
    getContactRegularlyCare, getDealAmountStaff, getDealAmountStage
}

function getContactPerMonth(idAccount, time){
    let a = null; 
    let _qs = null;
    if (time) {
        a = {
            time: time
        }
        _qs = qs.stringify(a);
    }
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = (_qs == null) ? `${config.apiContact}/${idAccount}/contacts/contactPermonth` : `${config.apiContact}/${idAccount}/contacts/contactPermonth?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getContactPerStaff(idAccount, time){
    let a = null; 
    let _qs = null;
    if (time) {
        a = {
            time: time
        }
        _qs = qs.stringify(a);
    }
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = (_qs == null) ? `${config.apiContact}/${idAccount}/contacts/contactPerStaff` : `${config.apiContact}/${idAccount}/contacts/contactPerStaff?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getContactPerStaffDetail(idAccount, time){
    let a = null; 
    let _qs = null;
    if (time) {
        a = {
            time: time
        }
        _qs = qs.stringify(a);
    }
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = (_qs == null) ? `${config.apiContact}/${idAccount}/contacts/owner-leadstatus` : `${config.apiContact}/${idAccount}/contacts/owner-leadstatus?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getContactRegularlyCare(idAccount, time){
    let a = null; 
    let _qs = null;
    if (time) {
        a = {
            time: time
        }
        _qs = qs.stringify(a);
    }
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = (_qs == null) ? `${config.apiContact}/${idAccount}/contacts/regularly-care` :  `${config.apiContact}/${idAccount}/contacts/regularly-care?${_qs}`;
    return responseService.fetchRetry(endpoint, request, 1)
}

function getDealAmountStaff(idAccount, time){
    let a = null; 
    let _qs = null;
    if (time) {
        a = {
            time: time
        }
        _qs = qs.stringify(a);
    }
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = (_qs == null) ? `${config.apiContact}/${idAccount}/deals/amount-staff` : `${config.apiContact}/${idAccount}/deals/amount-staff?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getDealAmountStage(idAccount, time){
    let a = null; 
    let _qs = null;
    if (time) {
        a = {
            time: time
        }
        _qs = qs.stringify(a);
    }
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = (_qs == null) ? `${config.apiContact}/${idAccount}/deals/amount-stage` : `${config.apiContact}/${idAccount}/deals/amount-stage?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}
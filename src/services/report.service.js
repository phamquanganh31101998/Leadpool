import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs');

export default {
    getContactPerMonth, getContactPerStaff, getContactPerStaffDetail,
    getContactRegularlyCare, getDealAmountStaff, getDealAmountStage
}

function getContactPerMonth(idAccount, from, to){
    let a = {}; 
    let _qs = '';
    if (from) {
        a.from = from
    }
    if (to) {
        a.to = to;
    }
    _qs = qs.stringify(a);
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contacts/contactPermonth?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getContactPerStaff(idAccount, from, to){
    let a = {};
    let _qs = '';
    if (from) {
        a.from = from
    }
    if (to) {
        a.to = to;
    }
    _qs = qs.stringify(a);
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contacts/contactPerStaff?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getContactPerStaffDetail(idAccount, from, to){
    let a = {};
    let _qs = '';
    if (from) {
        a.from = from
    }
    if (to) {
        a.to = to;
    }
    _qs = qs.stringify(a);
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contacts/owner-leadstatus?${_qs}`;
    return responseService.fetchRetry(endpoint, request, 1)
}

function getContactRegularlyCare(idAccount, from, to){
    let a = {}; 
    let _qs = '';
    if (from) {
        a.from = from
    }
    if (to) {
        a.to = to;
    }
    _qs = qs.stringify(a);
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contacts/regularly-care?${_qs}`;
    return responseService.fetchRetry(endpoint, request, 1)
}

function getDealAmountStaff(idAccount, from, to){
    let a = {}; 
    let _qs = '';
    if (from) {
        a.from = from
    }
    if (to) {
        a.to = to;
    }
    _qs = qs.stringify(a);
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/deals/amount-staff?${_qs}`;
    return responseService.fetchRetry(endpoint, request, 1)
}

function getDealAmountStage(idAccount, from, to){
    let a = {}; 
    let _qs = '';
    if (from) {
        a.from = from
    }
    if (to) {
        a.to = to;
    }
    _qs = qs.stringify(a);
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/deals/amount-stage?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}
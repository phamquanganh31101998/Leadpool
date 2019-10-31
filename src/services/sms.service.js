import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs');

export default {
    getTemplate, createTemplate, updateTemplate, 
    getListDeviceKey, createDeviceKey, getStatisticDetail, 
    getHistoryDetail, createSchedule, getSchedule,
    activateSchedule, deactivateSchedule
}

function getTemplate(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/sms-template`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createTemplate(idAccount, body){
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/sms-template`
    return responseService.fetchRetry(endpoint, request, 1)
}

function updateTemplate(idAccount, body){
    let request = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/sms-template`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getListDeviceKey(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/sms-device`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createDeviceKey(idAccount, body){
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/sms-device`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getStatisticDetail(idAccount, idDeviceKey){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/sms-device/${idDeviceKey}/statistic`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getHistoryDetail(idAccount, idDeviceKey){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/sms-device/${idDeviceKey}/history`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createSchedule(idAccount, body){
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/sms-schedule`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getSchedule(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/sms-schedule`
    return responseService.fetchRetry(endpoint, request, 1)
}

function activateSchedule(idAccount, idSchedule){
    let request = {
        method: 'PUT',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/sms-schedule/${idSchedule}/active`
    return responseService.fetchRetry(endpoint, request, 1)
}

function deactivateSchedule(idAccount, idSchedule){
    let request = {
        method: 'PUT',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/sms-schedule/${idSchedule}/in-active`
    return responseService.fetchRetry(endpoint, request, 1)
}
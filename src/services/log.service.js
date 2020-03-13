import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default {
    getLogsByType, createLog, deleteLog, updateLog
}

function getLogsByType(idAccount, idContact, type){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/type/${type}/logs`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createLog(idAccount, idContact, log){
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(log)
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/logs`
    return responseService.fetchRetry(endpoint, request, 1)
}

function deleteLog(idAccount, idContact, idLog){
    let request = {
        method: 'DELETE',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/logs/${idLog}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function updateLog(idAccount, idContact, log, idLog){
    let request = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(log)
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/logs/${idLog}`
    return responseService.fetchRetry(endpoint, request, 1)
}
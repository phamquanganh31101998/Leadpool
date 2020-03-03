import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs');

export default {
    createService, getService, updateService, deleteService
}

function createService(idAccount, body){
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/services`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getService(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/services`
    return responseService.fetchRetry(endpoint, request, 1)
}

function updateService(idAccount, idService, body){
    let request = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/services/${idService}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function deleteService(idAccount, idService){
    let request = {
        method: 'DELETE',
        headers: authHeader(),
    }
    let endpoint = `${config.apiContact}/${idAccount}/services/${idService}`
    return responseService.fetchRetry(endpoint, request, 1)
}
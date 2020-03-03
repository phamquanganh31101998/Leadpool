import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default {
    getFilter, createFilter, updateFilter, deleteFilter
}

function getFilter(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact-filters`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createFilter(idAccount, body){
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact-filters`
    return responseService.fetchRetry(endpoint, request, 1)
}

function updateFilter(idAccount, body){
    let request = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact-filters`
    return responseService.fetchRetry(endpoint, request, 1)
}

function deleteFilter(idAccount, idFilter){
    let request = {
        method: 'DELETE',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact-filters/${idFilter}`
    return responseService.fetchRetry(endpoint, request, 1)
}
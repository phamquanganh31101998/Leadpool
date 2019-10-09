import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default {
    getList, findContactByCondition, getContactByListId
}

function getList(idAccount) {
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/condition-group`
    return responseService.fetchRetry(endpoint, request, 1)
}

function findContactByCondition(idAccount, condition){
    let request = {
        method: 'GET',
        headers: authHeader(),
        body: JSON.stringify(condition)
    }
    let endpoint = `${config.apiContact}/${idAccount}/get-contact-condition`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getContactByListId(idAccount, idList){
    let request = {
        method: 'GET',
        headers: authHeader(),
    }
    let endpoint = `${config.apiContact}/${idAccount}/get-contact-condition/${idList}`
    return responseService.fetchRetry(endpoint, request, 1)
}
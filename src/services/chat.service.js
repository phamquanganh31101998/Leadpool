import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs');

export default {
    getAllTopic, getHistory, sendMessage
}

function getAllTopic(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/list-topic`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getHistory(idAccount, idTopic, page){
    let a = {
        page: page
    }
    let _qs = qs.stringify(a);
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/chat-history/${idTopic}?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function sendMessage(body){
    let headers = {};
    headers['Content-Type'] = 'application/json';
    let request = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiUrl}leadhub/chats`
    return responseService.fetchRetry(endpoint, request, 1)
}
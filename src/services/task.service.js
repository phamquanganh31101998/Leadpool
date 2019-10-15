import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs');

export default {
    getAllEmail, createTask, getTask, updateTask, getMyTask, getTaskById
}

function getAllEmail(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/getAllEmail`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createTask(idAccount, task){
    let request = {
        method: 'POST',
        body: JSON.stringify(task),
        headers: authHeader()
    };
    let endpoint = `${config.apiContact}/${idAccount}/tasks`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getTask(idAccount, idContact){
    let request = {
        method: 'GET',
        headers: authHeader()
    };
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/tasks`
    return responseService.fetchRetry(endpoint, request, 1)
}

function updateTask(idAccount, idContact, idTask, body){
    let request = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: authHeader()
    };
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/tasks/${idTask}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getMyTask(idAccount, page, status, type){
    let a = {
        page: page,
        status: status,
        type: type
    }
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let _qs = qs.stringify(a);
    let endpoint = `${config.apiContact}/${idAccount}/tasks/mytask?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getTaskById(idAccount, idTask){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/tasks/${idTask}`
    return responseService.fetchRetry(endpoint, request, 1)
}
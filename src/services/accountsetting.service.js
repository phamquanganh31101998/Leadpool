import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default{
    findUserByAccount, createAccount, getListAccount, 
    deleteAccount, inviteUser, setNewAccount,
    renameAccount, restoreDeletedAccount
}

function findUserByAccount(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/getAll`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createAccount(body){
    let request = {
        method: 'POST',
        headers: authHeader(), 
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiUrl}accounts`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getListAccount(){
    let request = {
        method: 'GET',
        headers: authHeader(),
    }
    let endpoint = `${config.apiUrl}accounts/getlistAccount`
    return responseService.fetchRetry(endpoint, request, 1)
}

function deleteAccount(idAccount){
    let request = {
        method: 'PUT',
        headers: authHeader(),
    }
    let endpoint = `${config.apiUrl}accounts/delete/${idAccount}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function inviteUser(idAccount, body){
    let request = {
        method: 'POST',
        headers: authHeader(), 
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/invite`
    return responseService.fetchRetry(endpoint, request, 1)
}

function setNewAccount(idAccount, idUser, body){
    let request = {
        method: 'PUT',
        headers: authHeader(), 
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/${idUser}/account`
    return responseService.fetchRetry(endpoint, request, 1)
}

function renameAccount(idAccount, body){
    let request = {
        method: 'PUT',
        headers: authHeader(), 
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiUrl}accounts/${idAccount}/rename`
    return responseService.fetchRetry(endpoint, request, 1)
}

function restoreDeletedAccount(idAccount){
    let request = {
        method: 'PUT',
        headers: authHeader(), 
    }
    let endpoint = `${config.apiUrl}accounts/${idAccount}/restore`
    return responseService.fetchRetry(endpoint, request, 1)
}
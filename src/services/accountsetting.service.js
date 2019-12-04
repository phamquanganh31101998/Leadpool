import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default{
    findUserByAccount, createAccount, getListAccount, 
    deleteAccount, inviteUser, setNewAccount,
    renameAccount, restoreDeletedAccount, getAccountInfo,
    updateAccountCountry, getCountryCode, getCity
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

function getAccountInfo(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/accountInfo`
    return responseService.fetchRetry(endpoint, request, 1)
}

function updateAccountCountry(idAccount, body){
    let request = {
        method: 'PUT',
        headers: authHeader(), 
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiUrl}accounts/${idAccount}/country`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getCountryCode(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/country-code`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getCity(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/country-city`
    return responseService.fetchRetry(endpoint, request, 1)
}
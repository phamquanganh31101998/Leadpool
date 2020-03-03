import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default{
    findUserByAccount, upgradeToAdmin, getAllGroupPermissions, updateAccessLevel, removeAdminPermission, getUserInfo
}

function findUserByAccount(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/getAll`
    return responseService.fetchRetry(endpoint, request, 1)
}

function upgradeToAdmin(idAccount, idUser){
    let body = {
        "groupPermissionId": "5d255b0c77201a474d72eacd"
    }
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/${idUser}/grouppermission`
    return responseService.fetchRetry(endpoint, request, 1)
}

function removeAdminPermission(idAccount, idUser){
    let request = {
        method: 'DELETE',
        headers: authHeader(),
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/${idUser}/grouppermission/5d255b0c77201a474d72eacd`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getAllGroupPermissions(){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiUrl}/grouppermissions`
    return responseService.fetchRetry(endpoint, request, 1)
}

function updateAccessLevel(idAccount, idUser, body){
    let request = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/${idUser}/accessLevel`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getUserInfo(idAccount, idUser){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/${idUser}`
    return responseService.fetchRetry(endpoint, request, 1)
}
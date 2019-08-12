import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default {
    getLogsByType, createLog
}

function getLogsByType(idAccount, idContact, type){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/type/${type}/logs`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createLog(){

}
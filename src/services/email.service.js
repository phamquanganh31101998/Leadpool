import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default {
    sendEmail
}

function sendEmail(idAccount, idContact, body){
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/email/send`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createEmailTemplate(idAccount, body){
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/emailTemplates`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getEmailTemplate(idAccount, body){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/emailTemplates`
    return responseService.fetchRetry(endpoint, request, 1)
}
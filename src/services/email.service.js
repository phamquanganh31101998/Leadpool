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
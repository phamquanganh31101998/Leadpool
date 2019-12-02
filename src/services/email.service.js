import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default {
    sendEmail, createEmailTemplate, getEmailTemplate, 
    sendEmailViaTemplate, getEmailHistory, createEmailSchedule,
    getEmailSchedule, activateSchedule, deactivateSchedule,
    getAllEmail, deleteEmailTemplate, trackingEmailActivities,
    updateEmailTemplate
}
function getAllEmail(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/user/getAllEmail`
    return responseService.fetchRetry(endpoint, request, 1)
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

function getEmailTemplate(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/emailTemplates`
    return responseService.fetchRetry(endpoint, request, 1)
}

function sendEmailViaTemplate(idAccount, idContact, idTemplate, body){
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/send-template-email/${idTemplate}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getEmailHistory(idAccount, idContact){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/email/history`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createEmailSchedule(idAccount, body){
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/email-schedules`
    return responseService.fetchRetry(endpoint, request, 1)
}

function getEmailSchedule(idAccount){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/email-schedules`
    return responseService.fetchRetry(endpoint, request, 1)
}

function activateSchedule(idAccount, idSchedule){
    let request = {
        method: 'PUT',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/email-schedules/${idSchedule}/active`
    return responseService.fetchRetry(endpoint, request, 1)
}

function deactivateSchedule(idAccount, idSchedule){
    let request = {
        method: 'PUT',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/email-schedules/${idSchedule}/in-active`
    return responseService.fetchRetry(endpoint, request, 1)
}

function deleteEmailTemplate(idAccount, idTemplate){
    let request = {
        method: 'DELETE',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/emailTemplates/${idTemplate}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function trackingEmailActivities(idAccount, idContact, body){
    let request = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/email/activities`
    return responseService.fetchRetry(endpoint, request, 1)
}

function updateEmailTemplate(idAccount, body){
    let request = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(body)
    }
    let endpoint = `${config.apiContact}/${idAccount}/emailTemplates`
    return responseService.fetchRetry(endpoint, request, 1)
}
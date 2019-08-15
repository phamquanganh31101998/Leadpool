import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default {
    getNotes, createNote, deleteNote, updateNote
}

function getNotes(idAccount, idContact){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/notes`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createNote(idAccount, idContact, note){
    let request = {
        method: 'POST',
        body: JSON.stringify(note),
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/notes`
    return responseService.fetchRetry(endpoint, request, 1)
}

function updateNote(idAccount, idContact, note, idNote){
    let request = {
        method: 'PUT',
        body: JSON.stringify(note),
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/notes/${idNote}`
    return responseService.fetchRetry(endpoint, request, 1)
}

function deleteNote(idAccount, idContact, idNote){
    let request = {
        method: 'DELETE',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/contact/${idContact}/notes/${idNote}`
    console.log(endpoint);
    return responseService.fetchRetry(endpoint, request, 1)
}
import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default {
    getNotes, createNote, deleteNote
}

function getNotes(idUser, idContact){
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idUser}/contact/${idContact}/notes`
    return responseService.fetchRetry(endpoint, request, 1)
}

function createNote(idUser, idContact, note){
    let request = {
        method: 'POST',
        body: JSON.stringify(note),
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idUser}/contact/${idContact}/notes`
    return responseService.fetchRetry(endpoint, request, 1)
}

function deleteNote(idUser, idContact, idNote){
    let request = {
        method: 'DELETE',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idUser}/contact/${idContact}/notes/${idNote}`
    console.log(endpoint);
    return responseService.fetchRetry(endpoint, request, 1)
}
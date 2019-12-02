import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'

export default {
    createDeal
}

function createDeal(idAccount, body){
    let request = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${idAccount}/deals`
    return responseService.fetchRetry(endpoint, request, 1)
}
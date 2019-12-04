import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'


export default {
    loginWithPass
}

function loginWithPass(body){
    let request = {
        method: 'POST',
        body: body,
        headers: {
            'Accept': 'application/json',
		    'Content-Type': 'application/json'
        }
    }
    let endpoint = `${config.authUrl}`
    return responseService.fetchRetry(endpoint, request, 1)
}
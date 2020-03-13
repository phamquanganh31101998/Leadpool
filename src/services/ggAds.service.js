import config from '../config'
import { authHeader } from '../helpers'
import { responseService } from './response.service'
const qs = require('qs')

export default {
    getListCid,takeInfoCid,convertGbtnToCid
}

function getListCid(accountId) {
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let endpoint = `${config.apiContact}/${accountId}/user/list-google-ads`
    return responseService.fetchRetry(endpoint, request, 1)
}

function takeInfoCid(accountId,code) {
    let a = {
        code: code
    }
    let request = {
        method: 'GET',
        headers: authHeader()
    }
    let _qs = qs.stringify(a);
    let endpoint = `${config.apiContact}/${accountId}/user/accessible-customer?${_qs}`;
    return responseService.fetchRetry(endpoint, request, 1)
}

function convertGbtnToCid(accountId,Gbtn,Cid) {
    let a = {
        customerId: Cid
    }
    let request = {
        method: 'PUT',
        headers: authHeader()
    }
    let _qs = qs.stringify(a);
    let endpoint = `${config.apiContact}/${accountId}/group-buttons/${Gbtn}/create-conversion?${_qs}`
    return responseService.fetchRetry(endpoint, request, 1)
}
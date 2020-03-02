import {store} from '../stores/index'

export const responseService = { handle, fetchRetry };

async function fetchRetry (url, options, n) {
    for (let i = 0; i < n; i++) {

        try
        {
            return await fetch(url, options).then(handle).then(result => { return result })
        }
        catch (err)
        {
            const isLastAttempt = i + 1 === n;
            if (isLastAttempt) throw err;
        }
    }
}

function handle (response) {
    return response.text().then(text => {
        // console.log(response)
        const data = text && JSON.parse(text);

        if(response.ok) return data;

        if (response.status === 401)
        {
            localStorage.removeItem('user');
            location.reload(true);
        }
        if (response.status === 403){
            store.state.forbiddenDialog = true;
        }
        const error = (data && data.error) || response.statusText;
        return Promise.reject(error);
    });
}
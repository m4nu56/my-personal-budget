const dotenv = require('dotenv');
dotenv.config();

/**
 * méthode centralisée pour effectuer les appels API
 *
 * @param url
 * @param method
 * @param payload
 * @returns {Promise<T | never>}
 */
export const makeRequest = (url, method = 'GET', payload, file) => {
    let urlApi = `${process.env.REACT_APP_API_URL}/${url}`;
    console.log(
        `urlApi call=${urlApi} with method=${method}` +
        (payload ? ` and payload=` : ''),
        payload ? payload : '',
        file ? file : '',
    );

    let formData;
    if (file) {
        formData = new FormData();
        formData.append('file',file,file.name);
    }

    const request = new window.Request(urlApi, {
        method: method,
        headers: new Headers({
            Accept: 'application/json',
            // 'Content-Type': formData ? '' : 'application/json'
            // 'Authorization': 'Bearer ' + window.localStorage.getItem(process.env.REACT_APP_SELDON_API_TOKEN_KEY)
        }),
        body: payload ? JSON.stringify(payload) : formData != null ? formData : null
    });

    // @formatter:off
    return fetch(request)
        .then(response => checkStatus(response))
        .catch(error => Promise.reject(error));
    // @formatter:on
};

export const uploadFile = (url, file) => {
    let urlApi = `${process.env.REACT_APP_API_URL}/${url}`;
    console.log(
        `upload file call=${urlApi}` +
        file ? file : '',
    );

    let formData;
    if (file) {
        formData = new FormData();
        formData.append('file',file,file.name);
    }

    const request = new window.Request(urlApi, {
        method: 'POST',
        headers: new Headers({
            Accept: 'application/json',
        }),
        body: formData != null ? formData : null
    });

    // @formatter:off
    return fetch(request)
        .then(response => checkStatus(response))
        .catch(error => Promise.reject(error));
    // @formatter:on
};

/**
 * Check HTTP Status and throw Error if not valid
 * @param response
 * @param mode
 * @returns {*}
 */
export const checkStatus = (response, mode = 'json') => {
    if (response.status < 200 || response.status >= 300) {
        console.error(
            `status not ok = ${response.status} ${response.statusText}`,
            response
        );
        throw new Error(
            `status not ok = ${response.status} ${response.statusText}`
        );
    }

    return mode ? response[mode]() : response;
};

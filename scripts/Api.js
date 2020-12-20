// todo: move to components/Api module

export default class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _request(tailUrl, method = 'GET', data = null) {
        const requestParams = {
            method: method,
        }

        if (data != null) {
            requestParams['body'] = JSON.stringify(data);
            requestParams.headers['Content-Type'] = 'application/json';
        }

        return fetch(this._baseUrl + tailUrl, requestParams)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка ${res.status}: ${res.statusText}`));
            })
    }

    verifyCitate(query) {
        return this._request(`verify?query=${query}`);
    }
}

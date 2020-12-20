// todo: move to components/Api module

export default class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _request(tailUrl, method = 'GET', data = null) {
        const requestParams = {
            method: method,
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

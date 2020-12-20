export default class Analytics {
    constructor(selector='.analytics') {
        this._element = document.querySelector(selector);
        this._percentElement = this._element.querySelector('.analytics__percent');
    }

    setCorrectPercent(value) {
        this._percentElement.textContent = `${Number(value).toFixed(2)}%`;
    }

    show() {
        this._element.classList.remove('hidden');
    }

    hide() {
        this._element.classList.add('hidden');
    }

}
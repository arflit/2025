export default class Analytics {
    constructor(selector='.analytics') {
        this._element = document.querySelector(selector);
        this._percentElement = this._element.querySelector('.analytics__percent');
        this._warningElement = this._element.querySelector('.analytics__text_warning');
    }

    clearContent() {
        this._warningElement.innerHTML = '';
    }

    setCorrectPercent(value) {
        this._percentElement.textContent = `${Number(value).toFixed(2)}%`;
    }

    setWarning(badLine) {
        //todo: сделать рефакаторинг: прятать весь текстовый элемент вместо пересоздания каждый раз через innerHTML
        this._warningElement.innerHTML = `Обратите внимание на <span class="analytics__line-number">${badLine}</span> строку, она не соответствует оригиналу`;
    }

    show() {
        this._element.classList.remove('hidden');
    }

    hide() {
        this._element.classList.add('hidden');
    }

}
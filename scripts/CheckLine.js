export class CheckLine {
  constructor (textLine, source) {
    this._line = textLine;
    this._source = source;
  }

  _getTemplate() {
    const row = document
    .querySelector('.temprow')
    .content
    .querySelector('.checkresult__row')
    .cloneNode(true);

    return row;
  }

  _isGood() {
    const number = Math.random();
    const isGood = (number < 0.6);
    return isGood;
  }

  _addGoodRow() {
    this._row = this._getTemplate();
    this._row.classList.add('checkresult__row_good');
    this._row.querySelector('.checkresult__source').textContent = this._source;
    this._row.querySelector('.checkresult__quote').textContent = this._line;
  }

  _addBadRow() {
    this._row = this._getTemplate();
    this._row.classList.add('checkresult__row_bad');
    this._row.querySelector('.checkresult__source').textContent = 'Классики такого не писали';
    this._row.querySelector('.checkresult__quote').textContent = this._line;
  }

  generateRow() {
    if (this._isGood()) {
      this._addGoodRow();
    } else {
      this._addBadRow();
  }

    return this._row;
  }
} 
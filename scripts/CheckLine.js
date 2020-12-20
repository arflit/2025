export class CheckLine {
  constructor (textLine, number, isGood) {
    this._line = textLine;
    this._number = number;
    this._isGood = isGood;
  }

  _getTemplate() {
    const row = document
    .querySelector('.temprow')
    .content
    .querySelector('.checkresult__row')
    .cloneNode(true);

    return row;
  }

  _addGoodRow() {
    this._row = this._getTemplate();
    this._row.querySelector('.checkresult__line').classList.add('checkresult__line_good');
    this._row.querySelector('.checkresult__number').textContent = this._number;
    this._row.querySelector('.checkresult__line').textContent = this._line;
  }

  _addBadRow() {
    this._row = this._getTemplate();
    this._row.querySelector('.checkresult__line').classList.add('checkresult__line_bad');
    this._row.querySelector('.checkresult__number').textContent = this._number;
    this._row.querySelector('.checkresult__line').textContent = this._line;
  }

  generateRow() {
    if (this._isGood) {
      this._addGoodRow();
    } else {
      this._addBadRow();
  }

    return this._row;
  }
} 
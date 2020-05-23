// Утилиты
import {createElement} from "../utils/render.js";

// Константы
const HIDDEN_CLASS = `visually-hidden`;

// Абстрактный компонент
export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }
}

// Компоненты
import Component from "./component.js";

// Умный абстрактный компонент
export default class SmartComponent extends Component {
  recoveryListeners() {
    throw new Error(`component method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}

// Компоненты
import TripInfoComponent from "../components/trip-info.js";

// Утилиты
import {remove, render, replace} from "../utils/render.js";

// Константы
import {RenderPosition} from "../const.js";

// Класс
export default class TripInfoController {
  constructor(container, tripModel) {
    this._container = container;
    this._tripModel = tripModel;

    this._tripInfoComponent = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._tripModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const oldTripInfoComponent = this._tripInfoComponent;

    this._tripInfoComponent = new TripInfoComponent(this._tripModel.getAllEvents());

    if (oldTripInfoComponent) {
      replace(this._tripInfoComponent, oldTripInfoComponent);
      remove(oldTripInfoComponent);
    } else {
      render(this._container, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _onDataChange() {
    this.render();
  }
}

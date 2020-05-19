// Компоненты
import TripSortComponent from "../components/trip-sort.js";
import TripDaysComponent from "../components/trip-days.js";
import TripDaysItemComponent from "../components/trip-days-item.js";
import TripEventsMsgComponent from "../components/trip-events-msg.js";

// Контроллеры
import TripEventsItemController from "./trip-events-item.js";

// Утилиты
import {render, RenderPosition} from "../utils/render.js";

// Константы
import {Mode, EmptyEventsItem} from "./trip-events-item.js";
import {SortType} from "../const.js";

// Отрисовка точек маршрута
const renderTripEvents = (container, events, onDataChange, onViewChange, isDefaultSortTtype = true) => {
  const tripEventsItemControllers = [];

  const dates = isDefaultSortTtype
    ? [...new Set(events.map((eventsItem) => new Date(eventsItem.start).toDateString()))]
    : [true];

  dates.forEach((date, index) => {
    const tripDaysItemComponent = isDefaultSortTtype
      ? new TripDaysItemComponent(date, index)
      : new TripDaysItemComponent();

    const tripDaysItemElement = tripDaysItemComponent.getElement();

    events
      .filter((eventsItem) => {
        return isDefaultSortTtype ? new Date(eventsItem.start).toDateString() === date : eventsItem;
      })
      .map((eventsItem) => {
        const tripEventsItemController = new TripEventsItemController(tripDaysItemElement, onDataChange, onViewChange);
        tripEventsItemController.render(eventsItem, Mode.DEFAULT);
        tripEventsItemControllers.push(tripEventsItemController);

        return tripEventsItemController;
      });

    render(container.getElement(), tripDaysItemComponent, RenderPosition.BEFOREEND);
  });

  return tripEventsItemControllers;
};

// Контроллер маршрута
export default class TripEventsController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._tripEventsItemControllers = [];

    this._tripEventsMsgComponent = new TripEventsMsgComponent();
    this._tripSortComponent = new TripSortComponent();
    this._tripDaysComponent = new TripDaysComponent();

    this._creatingEventsItem = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._tripSortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container;
    const events = this._eventsModel.getEvents();
    const noEvents = (events.length === 0);

    if (noEvents) {
      render(container, this._tripEventsMsgComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._tripSortComponent, RenderPosition.BEFOREEND);
    render(container, this._tripDaysComponent, RenderPosition.BEFOREEND);

    this._tripEventsItemControllers =
      renderTripEvents(this._tripDaysComponent, events, this._onDataChange, this._onViewChange);
  }

  createEventsItem() {
    if (this._creatingEventsItem) {
      return;
    }

    this._eventsModel.resetFilter();

    this._creatingEventsItem =
      new TripEventsItemController(this._container, this._onDataChange, this._onViewChange);
    this._creatingEventsItem.render(EmptyEventsItem, Mode.CREATING);
  }

  _removeEvents() {
    this._tripDaysComponent.clearElement();
    this._tripEventsItemControllers
      .forEach((tripEventsItemController) => tripEventsItemController.destroy());
    this._tripEventsItemControllers = [];
  }

  _updateEvents() {
    this._removeEvents();
    this._tripEventsItemControllers =
      renderTripEvents(this._tripDaysComponent, this._eventsModel.getEvents(), this._onDataChange, this._onViewChange);
  }

  _onDataChange(tripEventsItemController, oldData, newData) {
    if (oldData === EmptyEventsItem) {
      this._creatingEventsItem = null;
      if (newData === null) {
        tripEventsItemController.destroy();
        this._updateEvents();
      } else {
        this._eventsModel.createEventsItem(newData);
        tripEventsItemController.render(newData, Mode.DEFAULT);

        this._tripEventsItemControllers =
          [].concat(tripEventsItemController, this._tripEventsItemControllers);
        this._updateEvents();
      }
    } else if (newData === null) {
      this._eventsModel.removeEventsItem(oldData.id);
      this._updateEvents();
    } else {
      const isSuccess = this._eventsModel.updateEventsItem(oldData.id, newData);

      if (isSuccess) {
        tripEventsItemController.render(newData, Mode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._tripEventsItemControllers
      .forEach((tripEventsItemController) => tripEventsItemController.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const events = this._eventsModel.getEvents();
    let newEvents = events.slice();
    let sortedEvents = [];
    let isDefaultSortTtype = false;

    switch (sortType) {
      case SortType.EVENT:
        sortedEvents = newEvents;
        isDefaultSortTtype = true;
        break;
      case SortType.TIME:
        sortedEvents = newEvents.sort((a, b) => (b.end - b.start) - (a.end - a.start));
        break;
      case SortType.PRICE:
        sortedEvents = newEvents.sort((a, b) => b.price - a.price);
        break;
    }

    this._removeEvents();
    this._tripEventsItemControllers =
      renderTripEvents(this._tripDaysComponent, sortedEvents, this._onDataChange, this._onViewChang, isDefaultSortTtype);
  }

  _onFilterChange() {
    this._tripSortComponent.resetSortType();
    this._updateEvents();
  }
}

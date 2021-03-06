// Компоненты
import TripDaysItemComponent from "../components/trip-days-item.js";
import TripEventsMsgNoEventsComponent from "../components/trip-events-msg-no-events.js";
import TripSortComponent from "../components/trip-sort.js";

// Контроллеры
import TripEventsItemController from "./trip-events-item.js";

// Утилиты
import {remove, render} from "../utils/render.js";

// Константы
import {Mode, SortType, RenderPosition} from "../const.js";

import {EmptyEventsItem} from "./trip-events-item.js";

// Отрисовка точек маршрута
const renderTripEvents = (container, events, destinations, offers, onDataChange, onViewChange, defaultSortType) => {
  const tripEventsItemControllers = [];

  const dates = defaultSortType ? getTripDates(events) : [``];

  dates.forEach((date, index) => {
    const tripDaysItemComponent = defaultSortType
      ? new TripDaysItemComponent(date, index + 1)
      : new TripDaysItemComponent();

    const tripDaysItemElement = tripDaysItemComponent.getElement();

    events
      .filter((eventsItem) => defaultSortType
        ? new Date(eventsItem.start).toDateString() === date
        : eventsItem)
      .forEach((eventsItem) => {
        const tripEventsItemController = new TripEventsItemController(
            tripDaysItemElement,
            destinations,
            offers,
            onDataChange,
            onViewChange
        );
        tripEventsItemController.render(eventsItem, Mode.DEFAULT);
        tripEventsItemControllers.push(tripEventsItemController);
      });

    render(container.getElement(), tripDaysItemComponent, RenderPosition.BEFOREEND);
  });

  return tripEventsItemControllers;
};

// Получение дат маршрута
const getTripDates = (events) => {
  return Array.from(new Set(events.map((eventsItem) => new Date(eventsItem.start).toDateString())));
};

// Контроллер маршрута
export default class TripController {
  constructor(container, tripModel, api) {
    this._container = container;
    this._tripModel = tripModel;
    this._api = api;

    this._tripEventsItemControllers = [];

    this._tripSortComponent = new TripSortComponent();
    this._tripEventsMsgNoEventsComponent = null;

    this._tripEventsElement = document.querySelector(`.trip-events`);

    this._addingEventsItem = null;
    this._defaultSortType = null;

    this._currentSortType = SortType.EVENT;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._tripModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._tripSortComponent.hide();
    this._container.hide();
    this._removeNoEventsMessage();
  }

  show() {
    this._tripSortComponent.show();
    this._container.show();
    this._addNoEventsMessage();
  }

  render() {
    render(this._tripEventsElement, this._tripSortComponent, RenderPosition.AFTERBEGIN);

    this._addNoEventsMessage();

    this._tripSortComponent.setSortTypeChangeHandler((sortType) => {
      this._renderSortedEvents(sortType);
    });

    this._renderSortedEvents(this._currentSortType);
  }

  addEventsItem() {
    if (this._addingEventsItem) {
      return;
    }

    this._addingEventsItem = new TripEventsItemController(
        this._container,
        this._tripModel.getEventDestinations(),
        this._tripModel.getEventOffers(),
        this._onDataChange,
        this._onViewChange
    );
    this._addingEventsItem.render(EmptyEventsItem, Mode.ADD);
    this._removeNoEventsMessage();
    this._tripSortComponent.show();
  }

  _removeEvents() {
    this._container.clearElement();
    this._tripEventsItemControllers
      .forEach((tripEventsItemController) => tripEventsItemController.destroy());
    this._tripEventsItemControllers = [];
  }

  _updateEvents() {
    this._renderSortedEvents(this._currentSortType);
  }

  _renderSortedEvents(sortType) {
    const events = this._tripModel.getEvents();
    const newEvents = events.slice();
    let sortedEvents = [];

    this._defaultSortType = false;
    this._currentSortType = sortType;

    switch (sortType) {
      case SortType.EVENT:
        sortedEvents = newEvents.sort((firstItem, secondItem) =>
          firstItem.start > secondItem.start);
        this._defaultSortType = true;
        break;
      case SortType.TIME:
        sortedEvents = newEvents.sort((firstItem, secondItem) =>
          (secondItem.end - secondItem.start) - (firstItem.end - firstItem.start));
        break;
      case SortType.PRICE:
        sortedEvents = newEvents.sort((firstItem, secondItem) =>
          secondItem.price - firstItem.price);
        break;
    }

    this._removeEvents();
    this._tripEventsItemControllers = renderTripEvents(
        this._container,
        sortedEvents,
        this._tripModel.getEventDestinations(),
        this._tripModel.getEventOffers(),
        this._onDataChange,
        this._onViewChange,
        this._defaultSortType
    );
  }

  _addNoEventsMessage() {
    if (!this._tripEventsMsgNoEventsComponent && this._tripModel.getAllEvents().length === 0) {
      this._tripEventsMsgNoEventsComponent = new TripEventsMsgNoEventsComponent();
      render(this._tripEventsElement, this._tripEventsMsgNoEventsComponent, RenderPosition.AFTERBEGIN);
      this._tripSortComponent.hide();
    }
  }

  _removeNoEventsMessage() {
    if (this._tripEventsMsgNoEventsComponent) {
      remove(this._tripEventsMsgNoEventsComponent);
      this._tripEventsMsgNoEventsComponent = null;
    }
  }

  _onDataChange(tripEventsItemController, oldData, newData) {
    if (oldData === EmptyEventsItem) {
      this._addingEventsItem = null;
      if (newData === null) {
        tripEventsItemController.destroy();
      } else {
        this._api.addEventsItem(newData)
          .then((tripEventsItemModel) => {
            this._tripModel.addEventsItem(tripEventsItemModel);
            tripEventsItemController.render(tripEventsItemModel, Mode.DEFAULT);
            this._tripEventsItemControllers =
                [].concat(tripEventsItemController, this._tripEventsItemControllers);
            this._updateEvents();
          })
          .catch(() => {
            tripEventsItemController.shake();
          });
      }
    } else if (newData === null) {
      this._api.removeEventsItem(oldData.id)
        .then(() => {
          this._tripModel.removeEventsItem(oldData.id);
          this._updateEvents();
        })
        .catch(() => {
          tripEventsItemController.shake();
        });
    } else {
      this._api.updateEventsItem(oldData.id, newData)
       .then((tripEventsItemModel) => {
         const isSuccess = this._tripModel.updateEventsItem(oldData.id, tripEventsItemModel);

         if (isSuccess) {
           tripEventsItemController.render(tripEventsItemModel, Mode.DEFAULT);
           this._updateEvents();
         }
       })
       .catch(() => {
         tripEventsItemController.shake();
       });
    }
  }

  _onViewChange() {
    this._tripEventsItemControllers
      .forEach((tripEventsItemController) => tripEventsItemController.setDefaultView());
  }

  _onFilterChange() {
    this._updateEvents();
  }
}

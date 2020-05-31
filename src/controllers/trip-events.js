// Компоненты
import TripSortComponent from "../components/trip-sort.js";
import TripDaysComponent from "../components/trip-days.js";
import TripDaysItemComponent from "../components/trip-days-item.js";
import TripEventsMsgNoEventsComponent from "../components/trip-events-msg-no-events.js";

// Контроллеры
import TripEventsItemController from "./trip-events-item.js";

// Утилиты
import {render} from "../utils/render.js";

// Константы
import {EmptyEventsItem} from "./trip-events-item.js";
import {Mode, SortType, RenderPosition} from "../const.js";

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
      .map((eventsItem) => {
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

    render(container, tripDaysItemComponent, RenderPosition.BEFOREEND);
  });

  return tripEventsItemControllers;
};

// Получение дат маршрута
const getTripDates = (events) => {
  return Array.from(new Set(events
    .sort((firstItem, secondItem) => firstItem.start > secondItem.start ? 1 : -1)
    .map((eventsItem) => new Date(eventsItem.start).toDateString())
  ));
};

// Контроллер маршрута
export default class TripEventsController {
  constructor(container, tripEventsModel, api) {
    this._container = container;
    this._tripEventsModel = tripEventsModel;
    this._api = api;

    this._tripEventsItemControllers = [];

    this._tripEventsMsgNoEventsComponent = new TripEventsMsgNoEventsComponent();
    this._tripSortComponent = new TripSortComponent();
    this._tripDaysComponent = new TripDaysComponent();

    this._addingEventsItem = null;
    this._defaultSortType = null;
    this._currentSortType = SortType.EVENT;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._tripEventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._tripDaysComponent.hide();
    this._tripSortComponent.hide();
    // this._removeNoWaypoint();
  }

  show() {
    this._tripDaysComponent.show();
    this._tripSortComponent.show();
    // this._renderNoWaypoint();
  }

  render() {
    const container = this._container;
    const events = this._tripEventsModel.getEvents();
    const noEvents = (events.length === 0);

    if (noEvents) {
      render(container, this._tripEventsMsgNoEventsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._tripSortComponent, RenderPosition.BEFOREEND);
    render(container, this._tripDaysComponent, RenderPosition.BEFOREEND);

    this._tripSortComponent.setSortTypeChangeHandler((sortType) => {
      this._sortEvents(sortType);
    });

    this._sortEvents(this._currentSortType);
  }

  addEventsItem() {
    if (this._addingEventsItem) {
      return;
    }

    this._addingEventsItem = new TripEventsItemController(
        this._container,
        this._tripEventsModel.getEventDestinations(),
        this._tripEventsModel.getEventOffers(),
        this._onDataChange,
        this._onViewChange
    );
    this._addingEventsItem.render(EmptyEventsItem, Mode.ADD);
  }

  _removeEvents() {
    this._tripDaysComponent.clearElement();
    this._tripEventsItemControllers
      .forEach((tripEventsItemController) => tripEventsItemController.destroy());
    this._tripEventsItemControllers = [];
  }

  _updateEvents() {
    this._sortEvents(this._currentSortType);
  }

  _onDataChange(tripEventsItemController, oldData, newData) {
    if (oldData === EmptyEventsItem) {
      this._addingEventsItem = null;
      if (newData === null) {
        tripEventsItemController.destroy();
      } else {
        this._api.addEventsItem(newData)
          .then((tripEventsItemModel) => {
            this._tripEventsModel.addEventsItem(newData);
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
          this._tripEventsModel.removeEventsItem(oldData.id);
          this._updateEvents();
        })
        .catch(() => {
          tripEventsItemController.shake();
        });
    } else {
      this._api.updateEventsItem(oldData.id, newData)
       .then((tripEventsItemModel) => {
         const isSuccess = this._tripEventsModel.updateEventsItem(oldData.id, tripEventsItemModel);

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

  _sortEvents(sortType) {
    const events = this._tripEventsModel.getEvents();
    const newEvents = events.slice();
    let sortedEvents = [];

    this._defaultSortType = false;

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
    this._currentSortType = sortType;
    this._tripEventsItemControllers =
      renderTripEvents(
          this._tripDaysComponent.getElement(),
          sortedEvents,
          this._tripEventsModel.getEventDestinations(),
          this._tripEventsModel.getEventOffers(),
          this._onDataChange,
          this._onViewChange,
          this._defaultSortType
      );
  }

  _onFilterChange() {
    this._updateEvents();
  }
}

// Компоненты
import TripFiltersComponent from "../components/trip-filters.js";

// Утилиты
import {render, replace, RenderPosition} from "../utils/render.js";
import {getEventsByFilter} from "../utils/filter.js";

// Константы
import {FilterType} from "../const.js";

// Контроллер фильтров
export default class TripFiltersController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._tripFiltersComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const container = this._container;
    const allEvents = this._eventsModel.getAllEvents();

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getEventsByFilter(allEvents, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._tripFiltersComponent;

    this._tripFiltersComponent = new TripFiltersComponent(filters);
    this._tripFiltersComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._tripFiltersComponent, oldComponent);
    } else {
      render(container, this._tripFiltersComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._eventsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}

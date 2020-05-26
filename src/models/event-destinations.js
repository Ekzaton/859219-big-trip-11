// Класс
export default class EventDestinations {
  constructor() {
    this._destinations = null;
  }

  static getEventDestinations() {
    return EventDestinations._destinations;
  }

  static setEventDestinations(destinations) {
    EventDestinations._destinations = destinations;
  }
}

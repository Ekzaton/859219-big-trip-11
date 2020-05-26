// Класс
export default class EventOffers {
  constructor() {
    this._offers = null;
  }

  static getEventOffers() {
    return EventOffers._offers;
  }

  static setEventOffers(offers) {
    EventOffers._offers = offers;
  }
}

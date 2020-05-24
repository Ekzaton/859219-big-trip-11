export default class TripEventsItem {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.start = data[`date_from`];
    this.end = data[`date_to`];
    this.destination = data[`destination`];
    this.city = data[`destination`][`name`];
    this.description = data[`destination`][`description`] || ``;
    this.photos = new Array(data[`pictures`] || []);
    this.price = data[`base_price`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.offers = data[`offers`] || [];
  }

  static parseEvent(data) {
    return new TripEventsItem(data);
  }

  static parseEvents(data) {
    return data.map(TripEventsItem.parseEvent);
  }
}

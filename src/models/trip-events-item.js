// Класс
export default class TripEventsItem {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.start = new Date(data[`date_from`]);
    this.end = new Date(data[`date_to`]);
    this.city = data[`destination`][`name`];
    this.description = data[`destination`][`description`];
    this.photos = data[`destination`][`pictures`];
    this.price = data[`base_price`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.offers = data[`offers`];
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'date_from': this.start.toISOString(),
      'date_to': this.end.toISOString(),
      'destination': {
        'name': this.city,
        'description': this.description,
        'pictures': this.photos
      },
      'base_price': this.price,
      'is_favorite': this.isFavorite,
      'offers': this.offers
    };
  }

  static parseEventsItem(data) {
    return new TripEventsItem(data);
  }

  static parseEvents(data) {
    return data.map(TripEventsItem.parseEventsItem);
  }

  static clone(data) {
    return new TripEventsItem(data.toRAW());
  }
}

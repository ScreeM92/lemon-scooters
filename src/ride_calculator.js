import { Transform } from 'stream';
import moment from 'moment';
import keyBy from 'lodash.keyby';

class RideCalculator extends Transform {

  constructor(priceRate, options) {
    super({ objectMode: true, ...options });

    this.priceRate = keyBy(priceRate, 'zone');
  }

  _transform(chunk, encoding, callback) {
    if (chunk.isValid) {
      const dateFormat = 'YYYY-MM-DD HH:mm:ss';
      const start = moment(chunk.startTime, dateFormat);
      const end = moment(chunk.endTime, dateFormat);
      const minutes = Math.ceil(moment.duration(end.diff(start)).asMinutes());
      const ride = this.priceRate[chunk.zone];

      chunk.price = minutes * ride.price;
      chunk.currency = ride.currency;
      chunk.minutes = minutes;
    }

    this.push(chunk);

    callback();
  }
}

export default RideCalculator;
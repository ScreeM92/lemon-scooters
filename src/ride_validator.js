import { Transform } from 'stream';
import Ajv from 'ajv';
import ridesSchema from './common/schemas/scooter_rides_schema.js';

class RideValidator extends Transform {

  constructor(options) {
    super({ objectMode: true, ...options });

    this.validate = new Ajv().compile(ridesSchema);
  }

  _transform(chunk, encoding, callback) {
    const isValid = this.validate(chunk);
    this.push({ isValid, ...chunk });

    callback();
  }
}

export default RideValidator;

import Logger from '../logger.js';
import HttpClient from '../http/http_client.js';
import Ajv from 'ajv';
import priceRateSchema from '../schemas/price_rate_schema.js';

class ScooterService {
  
  async getRentalEventsCsv() {
    try {
      return await HttpClient.getFile(process.env.RENTAL_EVENTS_URL);
    } catch (error) {
      Logger.error(error.toString());
    }
  }

  async getRate() {
    try {
      const rate = await HttpClient.get(process.env.PRICE_RATE_URL);
      this.validate = new Ajv().compile(priceRateSchema);

      const isValid = this.validate(rate.data);
      if (!isValid) {
        throw new Error(JSON.stringify((this.validate.errors)));
      }

      return rate;
    } catch (error) {
      Logger.error(error.toString());
    }
  }
}

export default new ScooterService;
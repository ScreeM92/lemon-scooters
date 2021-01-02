
import Logger from '../logger.js';
import HttpClient from '../http/http_client.js';
import Ajv from 'ajv';
import priceRateSchema from '../schemas/price_rate_schema.js';

class ScooterService {
  
  async getRidesCsv() {
    try {
      return await HttpClient.getFile(process.env.RIDES_URL);
    } catch (error) {
      Logger.error(error.toString());
    }
  }

  async getRate() {
    try {
      const rate = await HttpClient.get(process.env.PRICE_RATE_URL);
      const validate = new Ajv.default({ allErrors: true }).compile(priceRateSchema);

      const isValid = validate(rate.data);
      if (!isValid) {
        throw new Error(JSON.stringify((validate.errors)));
      }
      
      return rate;
    }
    catch(error) {
      Logger.error(error.toString());
    }
  }
}

export default new ScooterService;
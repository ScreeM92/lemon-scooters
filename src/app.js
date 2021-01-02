import RideValidator from "./ride_validator.js";
import FileWriter from './file_writer.js';
import RideCalculator from "./ride_calculator.js";
import Logger from './common/logger.js';
import dotenv from 'dotenv';
import csv from 'fast-csv';
import ScooterService from './common/services/scooter_service.js';

dotenv.config();

Logger.info('Running ...');

Promise.all([ScooterService.getRate(), ScooterService.getRidesCsv()])
  .then(([{ data: priceRate }, { data: fileReadStream }]) => {
    const csvParser = csv({ headers: true, trim: true });

    fileReadStream
      .pipe(csvParser)
      .pipe(new RideValidator())
      .pipe(new RideCalculator(priceRate))
      .pipe(new FileWriter());

    Logger.info('... End');
  })
  .catch(error => {
    Logger.error(error.toString());
  });
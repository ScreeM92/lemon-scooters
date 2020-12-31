import RideValidator from "./ride_validator.js";
import FileWriter from './file_writer.js';
import RideCalculator from "./ride_calculator.js";
import Logger from './common/logger.js';
import dotenv from 'dotenv';
import csv from 'fast-csv';
import ScooterService from './common/services/scooter_service.js';

// remove
// import fs from 'fs';

dotenv.config();

Logger.info('Running ...');

try {
  // const fileReadStream = fs.createReadStream('./scooter_1337.csv', 'utf8');
  const { data: priceRate } = await ScooterService.getRate();
  const { data: fileReadStream } = await ScooterService.getRentalEventsCsv();
  const csvParser = csv({ headers: true, trim: true });

  fileReadStream
    .pipe(csvParser)
    .pipe(new RideValidator())
    .pipe(new RideCalculator(priceRate))
    .pipe(new FileWriter());
}
catch(error) {
  Logger.error(error.toString());
}

Logger.info('... End');
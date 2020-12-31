import { Writable } from 'stream';
import fs from 'fs';
import moment from 'moment';
import JSONStream from 'JSONStream';

class FileWriter extends Writable {

  constructor(options) {
    super({ objectMode: true, ...options });

    this.ridesFileWriter = JSONStream.stringify('[\n', ',\n', '\n]\n');
    this.errorsFileWriter = JSONStream.stringify('[\n', ',\n', '\n]\n');

    const timestamp = moment().unix();
    this.ridesFileWriter.pipe(fs.createWriteStream(`./output/rides/rides_${timestamp}.json`));
    this.errorsFileWriter.pipe(fs.createWriteStream(`./output/errors/errors_${timestamp}.json`));
  }

  _write(chunk, encoding, callback) {
    const isValid = chunk.isValid;
    delete chunk.isValid;

    if (isValid) {
      this.ridesFileWriter.write(chunk);
    }
    else {
      this.errorsFileWriter.write(chunk);
    }

    callback();
  }

  _final(callback) {
    this.ridesFileWriter.end();
    this.errorsFileWriter.end();

    callback();
  }
}

export default FileWriter;


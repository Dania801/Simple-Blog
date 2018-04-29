/* eslint-disable no-console*/

import mongoose from 'mongoose';
import constants from './constants';

mongoose.Promise = global.Promise;

try {
  mongoose.connect(constants.MONGO_URL);
} catch (e) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once('open', () => console.log('MongoDB is running!'))
  .on('error', err => {
    throw err;
  });

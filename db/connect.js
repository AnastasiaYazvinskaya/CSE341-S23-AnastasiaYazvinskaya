const dotenv = require("dotenv");
dotenv.config();

const mongoClient = require('mongodb').MongoClient;

let _db;

const initDb = callback => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }
  mongoClient.connect(process.env.DB_URI)
    .then(data => {
      _db = data;
      console.log("Database conection successfull");
      callback(null, _db);
    })
    .catch(err => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
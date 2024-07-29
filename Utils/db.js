const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


//const DB_URL = 'mongodb://127.0.0.1:27017/events';
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/titoReloaded';


const connect = () => mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true})
  .then((data) => {
    console.log(`conected to: ${data.connection.host}`)
});

module.exports = connect;0.
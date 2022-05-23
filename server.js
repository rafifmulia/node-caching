require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const { PORT } = process.env;

const app = express();

app.use(express.json({ limit: '10mb' })); // parsing json data
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // parsing x-www-formurlencoded

app.use(async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, ETag, Range, X-Requested-With, x-api-key, x-forwarded-for');
  next();
});

routes(app);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
})
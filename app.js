const express = require('express')
const router = require('./routes')
var bodyParser = require('body-parser')
const mongoos = require('mongoose')
const app = express()
const port = process.env.PORT | 5000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoos.connect('mongodb://localhost/my-app')
  .then(console.log('DB connected'))
  .catch(error => console.error(error));
app.use('/api/v1', router);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
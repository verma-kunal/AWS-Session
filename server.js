const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000;

app.use('/public', express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
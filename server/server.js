const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000;

// Setting up the static folder here:
app.use('/client', express.static(__dirname + "/../client"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
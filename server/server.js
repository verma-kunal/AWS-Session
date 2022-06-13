const path = require('path')
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_PUBLISHABLE_KEY)
require('dotenv').config({ path: './.env' });

const app = express()
const port = process.env.PORT || 3000;

// ----------- Imports & necessary things here -----------

// Setting up the static folder here:
app.use('/client', express.static(__dirname + "/../client"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
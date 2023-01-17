const express = require("express");
const app = express();
const { resolve } = require("path");
const port = process.env.PORT || 3000;

// importing the dotenv module to use environment variables:
require("dotenv").config();

const api_key = process.env.SECRET_KEY;

const stripe = require("stripe")(api_key);

// ------------ Imports & necessary things here ------------

// Setting up the static folder:
// app.use(express.static(resolve(__dirname, "./client")));
app.use(express.static(resolve(__dirname, process.env.STATIC_DIR)));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

// creating a route for success page:
app.get("/success", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/success.html");
  res.sendFile(path);
});

// creating a route for cancel page:
app.get("/cancel", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/cancel.html");
  res.sendFile(path);
});

// Workshop page routes:
app.get("/workshop1", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/workshops/workshop1.html");
  res.sendFile(path);
});
app.get("/workshop2", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/workshops/workshop2.html");
  res.sendFile(path);
});
app.get("/workshop3", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/workshops/workshop3.html");
  res.sendFile(path);
});

// ____________________________________________________________________________________

const domainURL = process.env.DOMAIN;
app.post("/create-checkout-session/:pid", async (req, res) => {
  
  const priceId = req.params.pid;
  
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${domainURL}/success?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/cancel`,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    // allowing the use of promo-codes:
    allow_promotion_codes: true,
  });
  res.json({
    id: session.id,
  });
});

// Server listening:
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  console.log(`You may access you app at: ${domainURL}`);
});

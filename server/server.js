const express = require("express");
const app = express();
const { resolve } = require("path");
const port = process.env.PORT || 3000;

// importing the dotenv module to use environment variables:
require("dotenv").config();

const api_key = process.env.SECRET_KEY;

const stripe = require("stripe")(api_key);

// Ensure environment variables are set (function defined at the end)
checkEnv();

// ------------ Imports & necessary things here ------------

// Setting up the static folder:
const static_dir_path = process.env.STATIC_DIR;

app.use(express.static(static_dir_path));

app.use(express.urlencoded());

app.get("/", (req, res) => {
  const path = resolve(static_dir_path + "/index.html");
  res.sendFile(path);
});

// creating a route for success page:
app.get("/success", (req, res) => {
  const path = resolve(static_dir_path + "/success.html");
  res.sendFile(path);
});

// creating a route for cancel page:
app.get("/cancel", (req, res) => {
  const path = resolve(static_dir_path + "/cancel.html");
  res.sendFile(path);
});

app.post("/create-checkout-session", async (req, res) => {
  const domainURL = process.env.DOMAIN;
  const priceId = process.env.PRICE_ID;

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
  console.log(`Server listening on port: ${port}!`);
});

function checkEnv() {
  const price = process.env.PRICE_ID;
  if (price === "price_12345" || !price) {
    console.log(
      "You must set a Price ID in the environment variables!"
    );
    process.exit(0);
  }
}

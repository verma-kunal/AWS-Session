const express = require("express");
const app = express();
const { resolve } = require("path");
const port = process.env.PORT || 3000;

const dotenv = require("dotenv");
dotenv.config({ resolve: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Ensure environment variables are set (function defined at the end)
checkEnv();

// ------------ Imports & necessary things here ------------

// Setting up the static folder:
app.use(express.static(process.env.STATIC_DIR));

app.use(express.urlencoded());

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

app.post("/create-checkout-session", async (req, res) => {
  const domainURL = process.env.DOMAIN;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${domainURL}/success?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/cancel`,
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.PRICE,
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
  const price = process.env.PRICE;
  if (price === "price_12345" || !price) {
    console.log(
      "You must set a Price ID in the environment variables. Please see the README."
    );
    process.exit(0);
  }
}

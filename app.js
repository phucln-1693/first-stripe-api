const keyPublishable = `pk_test_4hdlCMzDeRUfh7zkBIfXG9O2`;
const keySecret = `sk_test_xdlm5mgI9XwUvUL8dxd8ACmF`;
const path = require(`path`);

const app = require("express")();
const stripe = require("stripe")(keySecret);

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({ extended: false }));

app.get(`/`, (req, res) => {
  // res.render(`index.pug`, { keyPublishable });
  res.sendFile(path.join(__dirname, `./views`, `index.html`));
});

app.post("/payment", (req, res) => {
  let amount = 500;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
    .then(customer => {
      stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id
      })
    })
    .then(charge =>
      res.render("charge.pug"))
    .catch(err => {
      if (err) console.log(`loi buoc thanh toan: ${JSON.stringify(err)}`);
      console.log(`catch process`);
    })
});
app.listen(4567);

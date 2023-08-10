const express = require("express");
const expbs = require("express-handlebars");
const hbs = expbs.create();
const app = express();

app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("homepage");
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

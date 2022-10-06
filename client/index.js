const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8800;
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  req.query.action
    ? res.render("index", { action: req.query.action })
    : res.render("index");
});

app.get("/edit/:id", (req, res) => {
  console.log(req.params.id);
  res.render("index", { page: "Update Car Information" });
});

app.get("/new", (req, res) => {
  res.render("index", { page: "Add New Car" });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

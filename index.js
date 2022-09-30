const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

app.get("/");

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

const express = require("express");
const routes = require("./routes");
require('dotenv').load();

const app = express();

const port = process.env.PORT || 9999;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config()
require("./src/DB/connection")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.text())

app.use(cors({
    origin: "*"
}));

const taskRoute = require("./src/routes/task.route");
app.use("/api", taskRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app;
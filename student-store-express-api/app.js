const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const storeRoutes = require("./store-routes")

// app setup with morgan and body-parser
const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use("/store", storeRoutes);

// base get function
app.get("/", (req, res) => {
	res.send({ ping : "pong" });
});

// generic error handler
app.use((error, req, res, next) => {
    const { status, message } = error;
    
    const errorObj = {
        status: status || 500,
        message: message || 'Something went wrong with the application'
    };

    res.status(status).send({ error: errorObj });
});

module.exports = app;
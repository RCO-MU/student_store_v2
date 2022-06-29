const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const bodyParser = require("body-parser");
const { NotFoundError } = require("./utils/errors")
const storeRoutes = require("./store-routes")

// app setup with morgan, body-parser, and cors
const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors())

// set up /store routes
app.use("/store", storeRoutes);

// default get function (ping-pong)
app.get("/", (req, res) => {
	res.send({ ping : "pong" });
});

// handle all 404 errors that weren't matched by a route
app.use((req, res, next) => {
    return next(new NotFoundError())
  })

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
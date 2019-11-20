const express = require("express");
const createError = require("http-errors");
const logger = require("morgan"); // log library
const router = require("./router"); // automatically call index.js
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(express.urlencoded({extended: true})); //bodyParser.urlencoded

app.use("/", router); //route기능을 router에 넘김

app.use((req, res, next) => {
    next(createError(404));
 });
 
 app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
 
    res.status(err.status || 500);
    res.send(`${err.message} ${err.status}<br>${err.stack}`);
 });

 module.exports = app;
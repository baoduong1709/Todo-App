var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connectToDB = require("./config/db_connection");
var indexRouter = require("./routes/index");
var bodyParser = require("body-parser");
var usersRouter = require("./routes/user");
var tasksRouter = require("./routes/task")
require('dotenv').config();

var app = express();
process.env.TZ = "UTC";
const RedisStore = require("connect-redis").default;
const session = require("express-session");
const {createClient} = require("redis");
let redisClient = createClient()
redisClient.connect().catch(console.error)
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})
app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  }),
)
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
connectToDB();
app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/task", tasksRouter);
app.use(logger('dev'));
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

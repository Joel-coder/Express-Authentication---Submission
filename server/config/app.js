// installed 3rd party packages
let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

// modules for authentication
let session = require("express-session"); //Persist our user across different pages sessions is needed
let passport = require("passport");

let passportJWT = require("passport-jwt");
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

//let passportLocal = require("passport-local"); //Strategy to use user and password to
//let localStrategy = passportLocal.Strategy;
let flash = require("connect-flash");

//database setup
let mongoose = require("mongoose");
let DB = require("./db");

//point mongoose to the DB URI
mongoose.connect(DB.URI, { useNewURLParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
  console.log("Connected to MongoDB..");
});

let indexRouter = require("../routes/index");
let usersRouter = require("../routes/users");
let credentialRouter = require("../routes/credentials");
let ContactInfoRouter = require("../routes/businessContactsList");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
// express  -e
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

//Setup express session
app.use(
  session({
    secret: process.env.Secret,
    saveUninitialized: false,
    resave: false,
  })
);

// initialize flash
app.use(flash());

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Passport user configuration

//create a user model iinstance
let userModel = require("../models/user");
let User = userModel.User;

// implement a User Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserialize the user info

passport.serializeUser(User.serializeUser()); //store user inside of the session
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  console.log(jwtOptions);
  User.findById(jwt_payload.id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(err, false);
    });
});

passport.use(strategy);

app.use("/", indexRouter);
app.use("/users", usersRouter);
//app.use("/login", credentialRouter);
app.use("/contactInfo", ContactInfoRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error" });
});

module.exports = app;

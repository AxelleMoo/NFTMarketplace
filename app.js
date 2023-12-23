const express = require("express");

const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const nftsRouter = require("./API/routes/nftsRoute");
const usersRouter = require("./API/routes/usersRoute");

const AppError = require("./API/Utils/appError");
const globalErrorHandler = require("./API/controllers/errorController");

const app = express();
// app.use(express.json({ limit: "10kb" }));

//DATA SANITAZATION against NoSQL query injection
app.use(mongoSanitize());
//DATA SANITAZATION against site script XSS
app.use(xss());

//PREVENT PARAMETER POLLUTION
app.use(
  hpp({
    whitelist: [
      "duration",
      "difficult",
      "maxGroupSize",
      "price",
      "ratingsAverage",
      "ratingsQuantity",
    ],
  })
);

//middleware that sets properties in header for security reasons
// app.use(helmet());

//ratelimit
const limiter = rateLimit({
  max: 100,
  windowMw: 60 * 60 * 100, //100 request in 1 hours,
  message: "Too many request from this IP, please try again in an hour",
});

app.use("/api", limiter);

if (process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.use(morgan("dev"));

//SERVING TEMPLATE DEMO
app.use(express.static(`${__dirname}/nft-data/img`));

// //CUSTOM MIDDLE WARE
app.use((req, res, next) => {
  console.log("Hey I am from middleware function 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);


//Global ERROR handling
app.use(globalErrorHandler);

// app.all("*", (req, res, next) => {
//   // res.status(404).json({
//   //     status: "fail",
//   //     message: `Can't find ${req.originalUrl} on this server.`
//   // })

//   // const err = new Error(`Can't find ${req.originalUrl} on this server.`)
//   // err.status = "fail";
//   // err.statusCode = 404;
//   // next(err);

//   next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
// });


module.exports = app;

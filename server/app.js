const express = require("express");
const app = express();
const mongoose = require("mongoose");
const info = require("./utils/info");
const path = require("path");
const { MONGODB_URL } = require("./utils/config");
const reqLogger = require("./middleware/reqLogger");
const tokenExtractor = require("./middleware/tokenExtractor");

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/messageRouter");
// const catchHandler = require("./middleware/catchHandler");
const errorHandler = require("./middleware/errorHandler");

// DATABASE CONNECTION
(async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    info("MongoDB connected.");
  } catch (err) {
    info("MongoDB connection error: ", err.message);
  }
})();

// HEROKU SSL REDIRECT
// https://stackoverflow.com/questions/34862065/force-my-heroku-app-to-use-ssl-https
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

// STATIC FILES SERVER
if (process.env.NODE_ENV === "production") {
  // app.use("/static", express.static(path.join(__dirname, "/build/static")));
  app.use(express.static("build"));
}

// REQUEST PROCESSORS
app.use(express.json());
app.use(reqLogger);
app.use(tokenExtractor);

// REQUEST ROUTERS
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

// CATCH HANDLER
// app.use(catchHandler);
app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "/build"),
  });
});

// ERROR HANDLER
app.use(errorHandler);

module.exports = app;

const express = require("express");

//Client ID = 505354557624-an784vi9g1f1832rsssjou2e4oniphjg.apps.googleusercontent.com
//Client Secret = gbKyBURsVqso8a4OgPRARMab

const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const PORT = process.env.PORT || 5000;
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, () => {
  console.log("connected to db");
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoute")(app);

app.listen(PORT, () => {
  console.log("Server running on" + PORT);
});

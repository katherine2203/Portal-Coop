var express = require("express");
const session = require("express-session");
const passport = require("passport");
const appID = require("ibmcloud-appid");
// const cfenv = require("cfenv");
const bodyParser = require("body-parser");

const WebAppStrategy = appID.WebAppStrategy;

var app = express();
const port = process.env.PORT || 3000;

const CALLBACK_URL = "/ibm/cloud/appid/callback";

var env = process.env.NODE_ENV || "dev";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  session({
    secret: "2BB6EFD4954333D4AB862F7F14AB8",
    resave: true,
    saveUninitialized: true,
    proxy: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

let webAppStrategy = new WebAppStrategy(getAppIDConfig());
passport.use(webAppStrategy);
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

app.get(
  CALLBACK_URL,
  passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    failureRedirect: "/error"
  })
);
app.use("/", passport.authenticate(WebAppStrategy.STRATEGY_NAME));
// Point static path to dist
app.use("/", express.static(__dirname + "/dist"));

app.get("/logout", passport.authenticate(WebAppStrategy.STRATEGY_NAME), (req, res) => {
  WebAppStrategy.logout(req);
  res.redirect("/");
});

app.get("/api/token", (req, res) => {
  //res.json({"token": req.session[WebAppStrategy.AUTH_CONTEXT].accessToken});
  //var accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;
  var name = req.session[WebAppStrategy.AUTH_CONTEXT].identityTokenPayload.name;
  res.json(name);
});
app.get('/health', (req, res, next) => {
  res.json({status: 'UP'})
});
app.get("/error", (req, res) => {
  res.send("Authentication Error");
});

app.listen(port);

function getAppIDConfig() {
  let config;
  try {
    config = require("./localdev-config.json");
  } catch (e) {
    let vcapApplication = JSON.parse(process.env["VCAP_APPLICATION"]);
    return {
      redirectUri:
        "https://" + vcapApplication["application_uris"][0] + CALLBACK_URL
    };
  }
  return config;
}

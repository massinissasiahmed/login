const express = require("express");
const i18next = require("i18next");
const i18nexBackend = require("i18next-fs-backend");
const i18nextMiddleware = require("i18next-http-middleware");
const exphbs = require("express-handlebars"); // Import express-handlebars module
const app = express();
const path = require("path");
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js"); // Import routes
const PORT = process.env.PORT || 3001;

const detections = {
  order: ["cookie"],
  lookupCookie: "lang",
};

i18next
  .use(i18nexBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    detection: detections,
    fallbackLng: "fr",
    backend: {
      loadPath: "./locales/{{lng}}.json",
    },
  });

app.use(i18nextMiddleware.handle(i18next));

app.use(cookieparser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Set Handlebars as the view engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

// Route to render the login page
app.get("/", (req, res) => {
  res.render("login", {
    title: "Home",
    header: req.t("header", { returnObjects: true }),
    body: req.t("body", { returnObjects: true }),
    footer: req.t("footer", { returnObjects: true }),
  });
});

// Route for login page
app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    isSignupPage: false,
    header: req.t("header", { returnObjects: true }),
    body: req.t("body", { returnObjects: true }),
    footer: req.t("footer", { returnObjects: true }),
  }); // Pass isSignupPage as false
});

// Route for signup page
app.get("/signup", (req, res) => {
  res.render("signup", {
    title: "Sign Up",
    isSignupPage: true,
    header: req.t("header", { returnObjects: true }),
    body: req.t("body", { returnObjects: true }),
    footer: req.t("footer", { returnObjects: true }),
  }); // Pass isSignupPage as true
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

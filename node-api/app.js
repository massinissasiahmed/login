const express = require('express');
const i18next = require('i18next');
const i18nexBackend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');1
const exphbs  = require('express-handlebars'); // Import express-handlebars module
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js'); // Import routes
const PORT = process.env.PORT || 3001;


i18next.use(i18nexBackend).use(i18nextMiddleware.LanguageDetector)
.init({
    fallbackLng: 'fr',
    backend: {
        loadPath: './locales/{{lng}}/translation.json'
    }
})

app.use(i18nextMiddleware.handle(i18next))


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes); 

// Set Handlebars as the view engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the login page
app.get('/', (req, res) => {
    res.render('login', { title: 'Home' });
});

// Route for login page
app.get('/login', (req, res) => {
    console.log(req.t('header').'chou');
    res.render('login', { title: 'Login', isSignupPage: false, heade: req.t('header') }); // Pass isSignupPage as false
    // res.render('login', { title: 'Login', isSignupPage: false, create: i18next.t('create', {lng: req.headers["accept-language"]}) }); // Pass isSignupPage as false
});

// Route for signup page
app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up', isSignupPage: true }); // Pass isSignupPage as true
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

});









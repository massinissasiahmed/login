const express = require('express');
const exphbs  = require('express-handlebars'); // Import express-handlebars module
const app = express();
const path = require('path');

// Set Handlebars as the view engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the login page
// Route for login page
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', isSignupPage: false }); // Pass isSignupPage as false
});

// Route for signup page
app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up', isSignupPage: true }); // Pass isSignupPage as true
});


// Route for the home page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

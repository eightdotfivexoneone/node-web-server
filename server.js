const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//middlewear
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('serverlog', log + '/n', (err) => {
    if (err) {
      console.log('BROKE:' + err);
    }
  })
  next();
});

// app.use((req, res, next)=> {
//   res.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'Steve',
    likes: [
      'Biking',
      'Cities'
    ]
  })
});

app.get('/about', (req, res)=> {
  res.render('about.hbs', {
    pageTitle: 'About Page'
    });
});

app.get('/home', (req, res)=> {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the page!'
    });
});

app.get('/bad', (req, res)=> {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');

});


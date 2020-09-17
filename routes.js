const express = require('express');
const routes = express.Router();
const instructors = require('./instructors');
// routes // 
routes.get('/', (req, res) => {
     return res.redirect('/instructors');
});


routes.get('/instructors', (req, res) => {
    return res.render('instructors/index');
});


routes.get('/instructors/create', (req, res) => {
    return res.render('instructors/create');
});

// route created to take each user data using the id inside the data.json
routes.get('/instructors/:id', instructors.show);

// receive the datas from the user after
// filling the gaps
routes.post('/instructors', instructors.post );


routes.get('/members', (req, res) => {
    return res.send('members section');
});





module.exports = routes;
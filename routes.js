const express = require('express');
const routes = express.Router();

// routes // 
routes.get('/', (req, res) => {
     return res.redirect('/instructors');
});

routes.get('/instructors', (req, res) => {
    return res.render('instructors/index');
});

routes.get('/members', (req, res) => {
    return res.send('members section');
});




module.exports = routes;
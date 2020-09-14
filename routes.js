const express = require('express');
const routes = express.Router();

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

// receive the datas from the user after
// filling the gaps
routes.post('/instructors', (req, res) => {

    return res.send(req.body);
});


routes.get('/members', (req, res) => {
    return res.send('members section');
});





module.exports = routes;
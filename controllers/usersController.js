const { validationResult } = require('express-validator');

const usersController = {

    index: (req, res) => {
        res.render('index', {session: req.session, cookies: req.cookies.saveInfo});
    },

    register: function(req, res) {
        console.log();
        res.render('register' , {session: req.session, cookies: req.cookies.saveInfo});
    },

    store: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let data = req.body;
            let traduccionColores = {lightgray: 'gris', lightblue: 'celeste', lightcoral: 'coral'};
            let colorEnEspaniol = traduccionColores[data.color];
            data.colorEnEspaniol = traduccionColores[data.color];
            req.session.color = data.color;
            req.session.colorEnEspaniol = traduccionColores[req.session.color];
            req.session.name = data.name;
            req.session.email = data.email;
            req.session.age = data.age;

            if (data && data.saveInfo) {
                res.cookie('saveInfo', data, {maxAge : (1000 * 60 * 15)});
            } else if (data && !data.saveInfo) {
                res.clearCookie('saveInfo');
            };

            return res.render('register', {data: data, colorEnEspaniol: colorEnEspaniol, session: req.session, cookies: req.cookies.saveInfo})
        } else {
            return res.render('register', { errors: errors.mapped(), old: req.body, session: req.session, cookies: req.cookies.saveInfo});
        }
    },

    delete: (req, res) => {
        res.clearCookie('saveInfo');
        req.session.destroy();
        res.redirect('/users/register');
    }

};

module.exports = usersController;
var Option = require('../models/option'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('optionId', function(req, res, next, id) {
        Option.findById(id, function(err, option) {
            if (err) {
                next(err);
            } else {
                res.locals.option = option;
                next();
            }
        });
    });
    
    app.get('/options', function(req, res) {
        Option.find({}, function(err, options) {
            res.render('option/index', { options : options });
        });
    });

    app.get('/options/create', function(req, res) {
        res.render('option/create', { option : new Option() });
    });

    app.post('/options/create', function(req, res) { 
        var option = new Option(req.body);

        option.save(function(err) {
            if (err) {
                res.render('option/create', {
                    option : option
                });
            } else {
                res.redirect('/options');
            }
        });
    });

    app.get('/options/:optionId/edit', function(req, res) {
        res.render('option/edit');
    });

    app.post('/options/:optionId/edit', function(req, res) {
        mapper.map(req.body).to(res.locals.option);

        res.locals.option.save(function(err) {
            if (err) {
                res.render('option/edit');
            } else {
                res.redirect('/options');
            }
        });
    });

    app.get('/options/:optionId/detail', function(req, res) {
        res.render('option/detail');
    });

    app.get('/options/:optionId/delete', function(req, res) {
        res.render('option/delete');
    });

    app.post('/options/:optionId/delete', function(req, res) {
        Option.remove({ _id : req.params.optionId }, function(err) {
            res.redirect('/options');
        });
    });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
    name : 'Option',
    route : '/options'
}

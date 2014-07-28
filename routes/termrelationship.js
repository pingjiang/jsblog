var Termrelationship = require('../models/termrelationship'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('termrelationshipId', function(req, res, next, id) {
        Termrelationship.findById(id, function(err, termrelationship) {
            if (err) {
                next(err);
            } else {
                res.locals.termrelationship = termrelationship;
                next();
            }
        });
    });
    
    app.get('/termrelationships', function(req, res) {
        Termrelationship.find({}, function(err, termrelationships) {
            res.render('termrelationship/index', { termrelationships : termrelationships });
        });
    });

    app.get('/termrelationships/create', function(req, res) {
        res.render('termrelationship/create', { termrelationship : new Termrelationship() });
    });

    app.post('/termrelationships/create', function(req, res) { 
        var termrelationship = new Termrelationship(req.body);

        termrelationship.save(function(err) {
            if (err) {
                res.render('termrelationship/create', {
                    termrelationship : termrelationship
                });
            } else {
                res.redirect('/termrelationships');
            }
        });
    });

    app.get('/termrelationships/:termrelationshipId/edit', function(req, res) {
        res.render('termrelationship/edit');
    });

    app.post('/termrelationships/:termrelationshipId/edit', function(req, res) {
        mapper.map(req.body).to(res.locals.termrelationship);

        res.locals.termrelationship.save(function(err) {
            if (err) {
                res.render('termrelationship/edit');
            } else {
                res.redirect('/termrelationships');
            }
        });
    });

    app.get('/termrelationships/:termrelationshipId/detail', function(req, res) {
        res.render('termrelationship/detail');
    });

    app.get('/termrelationships/:termrelationshipId/delete', function(req, res) {
        res.render('termrelationship/delete');
    });

    app.post('/termrelationships/:termrelationshipId/delete', function(req, res) {
        Termrelationship.remove({ _id : req.params.termrelationshipId }, function(err) {
            res.redirect('/termrelationships');
        });
    });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
    name : 'Termrelationship',
    route : '/termrelationships'
}

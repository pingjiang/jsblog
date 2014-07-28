var Term = require('../models/term'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('termId', function(req, res, next, id) {
        Term.findById(id, function(err, term) {
            if (err) {
                next(err);
            } else {
                res.locals.term = term;
                next();
            }
        });
    });
    
    app.get('/terms', function(req, res) {
        Term.find({}, function(err, terms) {
            res.render('term/index', { terms : terms });
        });
    });

    app.get('/terms/create', function(req, res) {
        res.render('term/create', { term : new Term() });
    });

    app.post('/terms/create', function(req, res) { 
        var term = new Term(req.body);

        term.save(function(err) {
            if (err) {
                res.render('term/create', {
                    term : term
                });
            } else {
                res.redirect('/terms');
            }
        });
    });

    app.get('/terms/:termId/edit', function(req, res) {
        res.render('term/edit');
    });

    app.post('/terms/:termId/edit', function(req, res) {
        mapper.map(req.body).to(res.locals.term);

        res.locals.term.save(function(err) {
            if (err) {
                res.render('term/edit');
            } else {
                res.redirect('/terms');
            }
        });
    });

    app.get('/terms/:termId/detail', function(req, res) {
        res.render('term/detail');
    });

    app.get('/terms/:termId/delete', function(req, res) {
        res.render('term/delete');
    });

    app.post('/terms/:termId/delete', function(req, res) {
        Term.remove({ _id : req.params.termId }, function(err) {
            res.redirect('/terms');
        });
    });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
    name : 'Term',
    route : '/terms'
}

var Termtaxonomy = require('../models/termtaxonomy'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('termtaxonomyId', function(req, res, next, id) {
        Termtaxonomy.findById(id, function(err, termtaxonomy) {
            if (err) {
                next(err);
            } else {
                res.locals.termtaxonomy = termtaxonomy;
                next();
            }
        });
    });
    
    app.get('/termtaxonomies', function(req, res) {
        Termtaxonomy.find({}, function(err, termtaxonomies) {
            res.render('termtaxonomy/index', { termtaxonomies : termtaxonomies });
        });
    });

    app.get('/termtaxonomies/create', function(req, res) {
        res.render('termtaxonomy/create', { termtaxonomy : new Termtaxonomy() });
    });

    app.post('/termtaxonomies/create', function(req, res) { 
        var termtaxonomy = new Termtaxonomy(req.body);

        termtaxonomy.save(function(err) {
            if (err) {
                res.render('termtaxonomy/create', {
                    termtaxonomy : termtaxonomy
                });
            } else {
                res.redirect('/termtaxonomies');
            }
        });
    });

    app.get('/termtaxonomies/:termtaxonomyId/edit', function(req, res) {
        res.render('termtaxonomy/edit');
    });

    app.post('/termtaxonomies/:termtaxonomyId/edit', function(req, res) {
        mapper.map(req.body).to(res.locals.termtaxonomy);

        res.locals.termtaxonomy.save(function(err) {
            if (err) {
                res.render('termtaxonomy/edit');
            } else {
                res.redirect('/termtaxonomies');
            }
        });
    });

    app.get('/termtaxonomies/:termtaxonomyId/detail', function(req, res) {
        res.render('termtaxonomy/detail');
    });

    app.get('/termtaxonomies/:termtaxonomyId/delete', function(req, res) {
        res.render('termtaxonomy/delete');
    });

    app.post('/termtaxonomies/:termtaxonomyId/delete', function(req, res) {
        Termtaxonomy.remove({ _id : req.params.termtaxonomyId }, function(err) {
            res.redirect('/termtaxonomies');
        });
    });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
    name : 'Termtaxonomy',
    route : '/termtaxonomies'
}

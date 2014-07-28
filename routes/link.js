var Link = require('../models/link'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('linkId', function(req, res, next, id) {
        Link.findById(id, function(err, link) {
            if (err) {
                next(err);
            } else {
                res.locals.link = link;
                next();
            }
        });
    });
    
    app.get('/links', function(req, res) {
        Link.find({}, function(err, links) {
            res.render('link/index', { links : links });
        });
    });

    app.get('/links/create', function(req, res) {
        res.render('link/create', { link : new Link() });
    });

    app.post('/links/create', function(req, res) { 
        var link = new Link(req.body);

        link.save(function(err) {
            if (err) {
                res.render('link/create', {
                    link : link
                });
            } else {
                res.redirect('/links');
            }
        });
    });

    app.get('/links/:linkId/edit', function(req, res) {
        res.render('link/edit');
    });

    app.post('/links/:linkId/edit', function(req, res) {
        mapper.map(req.body).to(res.locals.link);

        res.locals.link.save(function(err) {
            if (err) {
                res.render('link/edit');
            } else {
                res.redirect('/links');
            }
        });
    });

    app.get('/links/:linkId/detail', function(req, res) {
        res.render('link/detail');
    });

    app.get('/links/:linkId/delete', function(req, res) {
        res.render('link/delete');
    });

    app.post('/links/:linkId/delete', function(req, res) {
        Link.remove({ _id : req.params.linkId }, function(err) {
            res.redirect('/links');
        });
    });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
    name : 'Link',
    route : '/links'
}

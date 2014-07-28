var Comment = require('../models/comment'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('commentId', function(req, res, next, id) {
        Comment.findById(id, function(err, comment) {
            if (err) {
                next(err);
            } else {
                res.locals.comment = comment;
                next();
            }
        });
    });
    
    app.get('/comments', function(req, res) {
        Comment.find({}, function(err, comments) {
            res.render('comment/index', { comments : comments });
        });
    });

    app.get('/comments/create', function(req, res) {
        res.render('comment/create', { comment : new Comment() });
    });

    app.post('/comments/create', function(req, res) { 
        var comment = new Comment(req.body);

        comment.save(function(err) {
            if (err) {
                res.render('comment/create', {
                    comment : comment
                });
            } else {
                res.redirect('/comments');
            }
        });
    });

    app.get('/comments/:commentId/edit', function(req, res) {
        res.render('comment/edit');
    });

    app.post('/comments/:commentId/edit', function(req, res) {
        mapper.map(req.body).to(res.locals.comment);

        res.locals.comment.save(function(err) {
            if (err) {
                res.render('comment/edit');
            } else {
                res.redirect('/comments');
            }
        });
    });

    app.get('/comments/:commentId/detail', function(req, res) {
        res.render('comment/detail');
    });

    app.get('/comments/:commentId/delete', function(req, res) {
        res.render('comment/delete');
    });

    app.post('/comments/:commentId/delete', function(req, res) {
        Comment.remove({ _id : req.params.commentId }, function(err) {
            res.redirect('/comments');
        });
    });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
    name : 'Comment',
    route : '/comments'
}

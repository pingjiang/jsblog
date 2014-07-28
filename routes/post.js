var Post = require('../models/post'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('postId', function(req, res, next, id) {
        Post.findById(id, function(err, post) {
            if (err) {
                next(err);
            } else {
                res.locals.post = post;
                next();
            }
        });
    });
    
    app.get('/posts', function(req, res) {
        Post.find({}, function(err, posts) {
            res.render('post/index', { posts : posts });
        });
    });

    app.get('/posts/create', function(req, res) {
        res.render('post/create', { post : new Post() });
    });

    app.post('/posts/create', function(req, res) { 
        var post = new Post(req.body);

        post.save(function(err) {
            if (err) {
                res.render('post/create', {
                    post : post
                });
            } else {
                res.redirect('/posts');
            }
        });
    });

    app.get('/posts/:postId/edit', function(req, res) {
        res.render('post/edit');
    });

    app.post('/posts/:postId/edit', function(req, res) {
        mapper.map(req.body).to(res.locals.post);

        res.locals.post.save(function(err) {
            if (err) {
                res.render('post/edit');
            } else {
                res.redirect('/posts');
            }
        });
    });

    app.get('/posts/:postId/detail', function(req, res) {
        res.render('post/detail');
    });

    app.get('/posts/:postId/delete', function(req, res) {
        res.render('post/delete');
    });

    app.post('/posts/:postId/delete', function(req, res) {
        Post.remove({ _id : req.params.postId }, function(err) {
            res.redirect('/posts');
        });
    });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
    name : 'Post',
    route : '/posts'
}

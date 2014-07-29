var passport = require('passport');

module.exports = function(app) {

  app.get('/login', function(req, res) {
    res.render('auth/login');
  });
  
  app.post('/login', function(req, res, next) {
    if (req.session.captcha !== undefined && req.session.captcha !== req.body.captcha) {
      req.flash('error', 'Captcha invalid');
      return res.redirect('/login');
    }
    
    // Custom callback hand failure and success.
    passport.authenticate('local', { 
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: 'Login successfully, welcome!'
    }, function(err, user, info) {
      if (err) {
        req.flash('error', 'login error ' + err);
        return res.redirect('/login');
      }
      if (!user) {
        req.flash('error', 'user is null');
        return res.redirect('/login');
      }
      req.logIn(user, function(err) {
        if (err) {
          req.flash('error', 'login error ' + err);
          return res.redirect('/login');
        }
        
        if (req.session) {
          req.session.user = user;
        }
    
        req.flash('success', 'Login successfully, welcome!');
        return res.redirect('/#' + user.niceName);
      });
    })(req, res, next);
  });
  
  app.get('/resetpassword', function(req, res) {
    res.render('auth/resetpassword');
  });
  
  app.post('/resetpassword', function(req, res) {
    // 通过邮箱来找回密码
    // 将用户设置为Inactive状态，重新生成activationKey
    // 通过发送邮件来重新激活账户
    // 激活账户的时候可以设置密码
    res.send('Not Support yet.');
  });
  
  
  app.get('/profile', function(req, res) {
    if (req.session && req.session.user) {
      res.render('auth/profile', { user: req.session.user });
    } else {
      res.redirect('/login');
    }
  });

  app.get('/logout', function(req, res) {
    // destroy the user's session to log them out
    // will be re-created next request
    req.logout();
    req.session.destroy(function(){
      res.redirect('/');
    });
  });

  app.post('/logout', function(req, res) {
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function(){
      res.redirect('/');
    });
  });
  
  // rest apis
  app.get('/api/users/me', passport.authenticate('basic', { session: false }), function(req, res) {
      res.json({ id: req.user.id, username: req.user.username });
  });
  
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Authorization',
  route : '/auth'
}

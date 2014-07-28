var passport = require('passport');

module.exports = function(app) {

  app.get('/login', function(req, res) {
    res.render('auth/login');
  });
  
  app.post('/login', passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true 
  }));
  
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

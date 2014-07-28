var assert = require("assert");
var User = require('../models/User.js');

describe('Authorization', function(){
  describe('#authenticate', function(){
    it('should login using correct username and password', function(){
      // assert.equal(-1, [1,2,3].indexOf(5));
      User.findOne({ niceName: 'pingjiang' }, function(err, user) {
        if (err) throw err;
        
        assert.equal(true, user.validPassword('pingjiang'));
      })
    })
  });
});


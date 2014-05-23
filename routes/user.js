
/*
 * GET users listing.
 */

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };
var User = require('../models/user.js');

module.exports = function (app) {
  app.get('/hello', function (req, res) {
    res.send('这里是 user 的路由');
  });
  app.get('/test', function (req, res) {
    User.getAttentions(req.session.user.name, function (err, docs) {
      if (err) {
        return res.send(err);
      }
      res.send(docs);
    });
  });
};
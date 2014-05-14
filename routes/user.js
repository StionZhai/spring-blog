
/*
 * GET users listing.
 */

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };

module.exports = function (app) {
  app.get('/hello', function (req, res) {
    res.send('这里是 user 的路由');
  });
}
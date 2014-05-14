var mongodb = require('./db');

function Attention (name, atnName, attention) {
  this.name = name;
  this.atnName = atnName;
  this.attention = attention;
}

module.exports = Attention;

// 存储一条关注标签
Attention.prototype.save = function(callback) {
  var name = this.name
  ,   attention = this.attention
  ,   atnName = this.atnName;

  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.update({
        "name": name
      }, {
        $push: {"attentions": attention}
      }, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
};
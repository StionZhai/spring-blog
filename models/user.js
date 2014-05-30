var mongodb = require('./db')
,   crypto = require('crypto');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
  this.description = user.description;
}

module.exports = User;

User.prototype.save = function(callback) {
  var md5 = crypto.createHash('md5')
  ,   email_MD5 = md5.update(this.email.toLowerCase()).digest('hex')
  ,   head = 'http://www.gravatar.com/avatar/' + email_MD5 + '?s=48';
  //要存入数据库的用户文档
  var user = {
    name: this.name,
    password: this.password,
    email: this.email,
    description: this.description,
    head: head
  };
  //打开数据库
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err); //错误, 返回err信息
    }
    // 读取 users 集合
    db.collection('users', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err); //错误, 返回err信息
      }
      // 将用户数据插入 users 集合
      collection.insert(user, {
        safe: true
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err); //错误, 返回err信息
        }
        callback(null, user[0]); //成功! err 为null, 并返回存储后的用户文档
      });
    });
  });
};

// 读取用户信息
User.get = function(name, callback) {
  // 打开数据库
  mongodb.open(function (err, db) {
    if(err) {
      return callback(err); //错误, 返回 err 信息
    }
    // 读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.findOne({
        name: name
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, user); // 成功! 返回查询结果
      });
    });
  });
};

// 获取用户所有的关注信息
User.getAttentions = function (name, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.find({
        "name": name
      },{
        "attentions": 1
      }).toArray(function (err, docs) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, docs);
      });
    });
  });
};

User.test1 = function (name) {
  mongodb.open(function (err, db) {
    if (err) {
      return err;
    }
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return err;
      }
      collection.find({
        "name": name
      },{
        "attentions": 1
      }).toArray(function (err, docs) {
        mongodb.close();
        if (err) {
          return err;
        }
        return docs;
      });
    });
  });
};
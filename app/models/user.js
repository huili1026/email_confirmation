const sql = require("../../dbService");

// constructor
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
  this.email = user.email;
  this.confirmed = false;
  this.temporarytoken = null;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByToken = (token, result) => {
    sql.query(`SELECT * FROM user WHERE temporarytoken = ${token}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the token;
      result({ kind: "not_found" }, null);
    });
  };

  User.updateByToken = (token, user, result) => {
    sql.query(
      "UPDATE user SET temporarytoken = ? confirmed = ? WHERE temporarytoken = ?",
      [null, true, token],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { username: username, ...user });
        result(null, { username: username, ...user });
      }
    );
  };


module.exports = User;
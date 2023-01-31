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
        console.log(res[0]);
        return;
      }
  
      // not found user with the token;
      result({ kind: "not_found" }, null);
    });
  };


module.exports = User;
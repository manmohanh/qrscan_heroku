const { readDbs, writeDb } = require("../../utils/sqlCommands");

async function login({ username, password }) {
  const check = await readDbs("metadata_users", {
    field: "username",
    value: username,
  });
  console.log(check);
  if (check.flag) {
    const passCheck = check.data[0].password == password;
    if (passCheck) {
      return {
        flag: true,
        token: check.data[0].token,
        role: check.data[0].user_role,
      };
    } else {
      return {
        flag: false,
        message: "wronge password",
      };
    }
  } else {
    return {
      flag: false,
      message: "no user exists",
      details: check,
    };
  }
}

module.exports = login;

const { writeDb, readDbs } = require("../../utils/sqlCommands");

async function createUser(usrData) {
  const { user_role, username, password } = usrData;
  const fields = ["user_role", "username", "password", "token"];

  const id = Math.floor(Math.random() * 100);
  const token = `${id}/${username}/${Math.floor(Math.random() * 10000)}`;
  const values = [user_role, username, password, token];

  const checkUser = await readDbs("metadata_users", {
    field: "username",
    value: username,
  });

  if (checkUser.flag) {
    return {
      flag: false,
      message: "User already exists",
    };
  } else {
    const response = await writeDb("metadata_users", fields, values);

    if (response.flag) {
      return {
        flag: true,
        message: `user created ${username}`,
        token: token,
      };
    } else {
      return response;
    }
  }
}

module.exports = createUser;

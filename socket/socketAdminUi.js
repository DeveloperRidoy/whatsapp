const { instrument } = require("@socket.io/admin-ui");
const bcrypt = require("bcrypt");

const socketAdminUi = function (io) {
  const username = process.env.SOCKET_ADMIN_USERNAME;
  const password = process.env.SOCKET_ADMIN_PASSWORD;

  if (username && password) {
    bcrypt.hash(password, 12, (err, hash) => {
      if (err) {
        console.log("shutting down server on error");
        console.log(err);
        process.exit(1);
      }
      instrument(io, {
        auth: {
          type: "basic",
          username,
          password: hash,
        },
      });
    });
  } else {
    instrument(io, { auth: false });
  }

};

module.exports = socketAdminUi;

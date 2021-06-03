const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require("socket.io")(server);
const next = require('next');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
const socket = require('./socket/socket');
const cors = require('cors');
const { instrument } = require('@socket.io/admin-ui');
const bcrypt = require('bcrypt');

// environmental variables
dotenv.config({ path: `${__dirname}/.env.local` });

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();


nextApp
  .prepare()
  .then(() => {
    // trust proxy
    app.enable("trust proxy");

    // cosr 
    app.use(cors({ origin: ["https://admin.socket.io"], optionsSuccessStatus: 200 }));

    // socket.io connection
    socket(io);

    // socket.io admin ui 
    const username = process.env.SOCKET_ADMIN_USERNAME;
    const password = process.env.SOCKET_ADMIN_PASSWORD
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
      instrument(io, { auth: false,});
    }

    // show api requests info in development mode
    if (process.env.NODE_ENV !== "production") {
      app.use(morgan("combined"));
    }

    // compress response
    app.use(compression());

    // body parser, cookie parser, urlencoding
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true, limit: "10kb" }));

    // handle nextJs requests
    app.get("*", (req, res) => handle(req, res));

    // define port
    const PORT = process.env.PORT || 3000;

    // start server
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Server running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("shutting down server on error");
    console.log(err);
    process.exit(1);
  });
const { SEND_MESSAGE } = require('../utils/variables');
const sendMessage = require('./methods/sendMessage');

module.exports = (io) => {
    io.on("connect", (socket) => {
        const id = socket.handshake.query.id;
      socket.join(id);
      console.log('client connected')
        socket.emit("connection", {
            status: "connected",
            msg: "message from socket.io",
            id
        });

    // on sending message from client
      socket.on(SEND_MESSAGE, sendMessage(io))    
    
    // on client disconnect
      socket.on("disconnect", () => console.log("client disconnected"));
    });
  
  
  // **************** just for testing purposes ********************** //
  // // socket connection on custom namespace
  // const userIo = io.of('/user');  //use 'of' to use custom namspaces just like url in a api route
  // userIo.on("connect", socket => {
  //   console.log(`connected to namespace /user as ${socket.userName}`);
  //   socket.on('ping', ping => console.log(ping));
  // })

  // // attaching userName to socket object using middleware;
  // userIo.use((socket, next) => {
  //   if (!socket.handshake.auth.token) return next(new Error('please send token'))
    
  //   socket.userName = socket.handshake.auth.token + socket.id;
  //   next();
  // })
}
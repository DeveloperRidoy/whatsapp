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
}
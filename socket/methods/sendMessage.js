const { RECEIVE_MESSAGE } = require("../../utils/variables");

module.exports = (io) => ({ recepients, message }) => {
    recepients.forEach(r => {
        io.to(r).emit(RECEIVE_MESSAGE, { recepients, message });
    })
}
const { RECEIVE_MESSAGE } = require("../../utils/variables");

module.exports = (io) => ({ recepients, message }) => {
    io.emit(RECEIVE_MESSAGE, {recepients, message})
}
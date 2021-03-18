module.exports = function (io) {
  //const user = new User();
  io.on("connection", (socket) => {
    console.log("user connected");
    // socket.on("reload", (data) => {
    //   io.emit("reloadPage", data);
    // });
  });
};

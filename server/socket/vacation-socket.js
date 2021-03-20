module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("connect user");
    socket.on("reload", (data) => {
      io.emit("reloadPage", data);
    });
    socket.on("disconnect", () => {
      console.log("disconnect user");
    });
  });
};

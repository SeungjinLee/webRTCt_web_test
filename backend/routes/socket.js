module.exports = function(io){

  var nickNames = [];

  io.on('connection', function(socket) {
    socket.on('enter', function(data) {
      var pos = nickNames.findIndex(x => x.nickname === data.nickName);
      var resultMsg = {};

      if(pos=="-1"){
        nickNames.push({'sid':socket.id, 'nickname':data.nickName});
        resultMsg["nickName"] = data.nickName;
        resultMsg["overlap"] = false;
      }else{
        resultMsg["nickName"] = data.nickName;
        resultMsg["overlap"] = true;
      }

      io.to(socket.id).emit("enter", resultMsg);

      console.log(nickNames);
    });
    socket.on('forceDisconnect', function() {
      socket.disconnect();
      /* var pos = nickNames.findIndex(x => x.sid === socket.id);
      nickNames.splice(pos, 1); */
      console.log('forceDisconnect' + socket.id);
    })
    socket.on('disconnect', function() {
      /* var pos = nickNames.findIndex(x => x.sid === socket.id);
      nickNames.splice(pos, 1); */
      console.log('user disconnected: ' + socket.id);
    });
  });

  io.of('/chat').on('connection', function(socket) {
    socket.on('login', function(data) {

    });
    socket.on('forceDisconnect', function() {
      socket.disconnect();
    })
    socket.on('disconnect', function() {
      console.log('user disconnected: ' + socket.nickName);
    });
  });
};
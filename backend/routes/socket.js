var connectList =[];
module.exports = {
  start : function(io){
    io.of('/chat').on('connection', function(socket) {
      socket.on('enter', function(data) {
        console.log("enter : "+socket.id);
        console.log(data);
        connectList.push({sid:socket.id, nickname:data.nickname});
        console.log(connectList);
      });
      socket.on('forceDisconnect', function() {
        socket.disconnect();
        var pos = connectList.findIndex(x => x.sid === socket.id);
        connectList.splice(pos, 1);
        console.log('forceDisconnect' + socket.id);
      })
      socket.on('disconnect', function() {
        var pos = connectList.findIndex(x => x.sid === socket.id);
        connectList.splice(pos, 1);
        console.log('user disconnected: ' + socket.id);
      }); 
    });
  },
  getConnectList : function(){
    return connectList;
  }
};
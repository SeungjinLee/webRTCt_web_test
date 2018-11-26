var format = require('date-format');

var connectList =[];
module.exports = {
  start : function(io){
    var chat = io.of('/chat').on('connection', function(socket) {
      socket.on('enter', function(data) {
        connectList.push({
          sid : socket.id, 
          nickname : data.nickname,
          join_date : format.asString('hh:mm', new Date()),
          call_check : false
        });
        console.log(connectList); 
        chat.emit("enter", connectList);
      });
      socket.on('forceDisconnect', function() {
        socket.disconnect();
        var pos = connectList.findIndex(x => x.sid === socket.id);
        connectList.splice(pos, 1);
        console.log('forceDisconnect' + socket.id);
        chat.emit("enter", connectList);
      });
      socket.on('disconnect', function() {
        var pos = connectList.findIndex(x => x.sid === socket.id);
        connectList.splice(pos, 1);
        console.log('user disconnected: ' + socket.id);
        chat.emit("enter", connectList);
      }); 
    });
  },
  getConnectList : function(){
    return connectList;
  }
};
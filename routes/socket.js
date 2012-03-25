module.exports = function(app, client, pub, sub) {
  var parseCookie = require('connect').utils.parseCookie;
  var io = require('socket.io').listen(app);
  
  sub.subscribe('messages');
  
  io.of('/messages')
    .on('connection', function(socket) {
      socket.on('message', function(message) {
        client.incr('messageNextId', function(err, id) {
          client.sadd('messages', id);
          client.hmset('message:' + id, 'message', message, function(err, reply) {
            pub.publish('messages', 'message:' + id);
          })
        })
      })
      sub.on('message', function(channel, key) {
        client.hgetall(key, function(err, reply) {
          socket.emit('message', reply);
        })
      })
    });
}

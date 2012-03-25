(function($) {
  $(document).ready(function() {
    /**
     * Socket stuff
     */
    var socket = io.connect('http://192.168.0.250/messages');
    
    socket.on('connect', function() {
    });
    
    socket.on('message', function(message) {
      if ($('.message').length > 10) {
        $('.message:last-child').remove();
      }
      $('#messages').prepend(
        $('<div></div>')
          .append('Message : ' + message.message)
          .addClass('message')
      );
    });
    
    /**
     * Posting message stuff
     */
    $('#send').click(function() {
      socket.emit('message', $('#message').val())
      $('#message').val('');
    });
  });
}(jQuery));

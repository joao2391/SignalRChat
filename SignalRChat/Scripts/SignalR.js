$(function () {
    // Declare a proxy to reference the hub.
    var chat = $.connection.chatHub;
    // Create a function that the hub can call to broadcast messages.
    chat.client.broadcastMessage = function (name, message) {
        // Html encode display name and message.
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        var hora = new Date();
        //document.getElementById("hora").innerHTML = hora.getHours() + ":" + hora.getMinutes();


        // Add the message to the page.
        $('#discussion').append('<div class="form-control"><header class="bg-dark form-control">' + encodedName + '<p class="float-right">' + hora.getHours() + ":" + hora.getMinutes() + '</p>' + '</header><hr>&nbsp;&nbsp;' + encodedMsg + '</div></br>');
    };
    // Get the user name and store it to prepend to messages.
    $('#displayname').val(prompt('Por favor, insira seu nome:', ''));
    // Set initial focus to message input box.
    $('#message').focus();
    // Start the connection.
    $.connection.hub.start().done(function () {
        $('#sendmessage').click(function () {
            // Call the Send method on the hub.
            chat.server.send($('#displayname').val(), $('#message').val());
            // Clear text box and reset focus for next comment.
            $('#message').val('').focus();
        });

        $('#message').keypress(function (event) {
            if (event.which == 13 || event.keyCode == 13) {
                chat.server.send($('#displayname').val(), $('#message').val());
                $('#message').val('').focus();
            }
        });
    });
});


(function () {
    $('.chat-close').on('click',
        function (e) {

            e.preventDefault();
            $('#live-chat').fadeOut(300);
        });

})();
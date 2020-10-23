$(document).ready(function() {

    function loadUserInfo() {
        return $.get(
            {
                url: 'http://private-anon-a1e1b8d498-wad20postit.apiary-mock.com/users/1',
                success: function (response) {
                    return response;
                },
                error: function () {
                    alert('error')
                }
            }
        );
    }

    function displayUserInfo(user) {
        $('#name').text(user.firstname + " " + user.lastname);
        $('#email').text(user.email);
        $(".avatar").attr("src", user.avatar);
    }

    loadUserInfo()
        .then(function (user) {
            displayUserInfo(user)
        })
        .catch(function () {
            alert('Error loading user info')
        });


    // on click on avatar-container
    $(".avatar-container").click(function() {
        var val = $(this).attr('id');
        if (val == 1) {
            $("ul").hide();
            $(this).attr('id', '0');
        } else {
            $("ul").show();
            $(this).attr('id', '1');
        }
    });

});
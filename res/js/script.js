$(document).ready(function() {



    //index page user information
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

    //browse page profiles
    $.get('https://private-anon-a1e1b8d498-wad20postit.apiary-mock.com/profiles', function (response) {
        for (profile of response) {
            let div = $('<div class="profile">');
            let userName = $('<h1>').text(profile.firstname + " " + profile.lastname);
            let img = $('<img>').attr('src', profile.avatar);
            let button = $('<button/>', {
                text: 'Follow',
                id: 'followButton',
                click: ClickFollowButton
            });



            div.append(img)
            div.append(userName)
            div.append(button)

            $('#profile').append(div)
        }
    })

    //browse page. button follow to followed

    let pressed = false;

    function ClickFollowButton() {
        if (pressed === true) {
            pressed = false;
            $(this).text("Follow")
        } else {
            pressed = true;
            $(this).text("Followed")
        }
    }

    //index page for post
    $.get('https://private-anon-a1e1b8d498-wad20postit.apiary-mock.com/posts', function (response) {
        for (post of response) {
            let div = $('<div class="post">');
            let postauthor = $('<div class="post-author">');
            let postauthorInfo = $('<nav class="post-author-info">');
            let userName = $('<small>').text(post.author.firstname + " " + post.author.lastname);
            let img = $('<img>').attr('src', post.author.avatar);
            let time = $('<small>').text(post.createTime);
            let text = $('<p class="post-title">').text(post.text);
            //let likes = $('<p>').text(post.likes);

            postauthorInfo.append(img);
            postauthorInfo.append(userName);
            postauthorInfo.append(time);
            postauthor.append(postauthorInfo);

            let likes = $('<button>', {
                text: post.likes,
                id: 'likeButton',
                click: ClickLikeButton
            });

            //div.append(img)
            //div.append(userName)
            div.append(postauthor);
            div.append(time)
            div.append(text)

            // Need to add media. Media can be empty. Media can be images or video.
            let media;
            let mediaImage = $('<div class="post-image">');
            if (post.media != null) {
                if (post.media.type === 'image') {
                    media = $('<img>').attr('src', post.media.url);
                    mediaImage.append(media)
                    div.append(mediaImage)
                } else if (post.media.type === 'video') {
                    media = $('<video width="320", height="240", controls>').attr('src', post.media.url)
                    mediaImage.append(media)
                    div.append(mediaImage)
                    //div.append(media)
                }
            }

            div.append(likes)

            $('#post').append(div)
        }
    })

    //index page. like button
    let likePressed = true
    function ClickLikeButton() {

        if (likePressed === true) {

            $(this).css('background-color','#868184');
            likePressed = false;
        } else {
            $(this).css('background-color','#01579B');
            likePressed = true;

        }
    }

});
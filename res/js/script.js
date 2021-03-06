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

    loadUserInfo()
        .then(function (user) {
            displayUserInfo(user)
        })
        .catch(function () {
            alert('Error loading user info')
        });

    function displayUserInfo(user) {
        $('#name').text(user.firstname + " " + user.lastname);
        $('#email').text(user.email);
        $(".avatar").attr("src", user.avatar);
    }

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
            let userName = $('<p>').text(profile.firstname + " " + profile.lastname);

            let img = $('<img>').attr('src', profile.avatar);
            let button = $('<button/>', {
                text: 'Follow',
                id: 'followButton',
                click: ClickFollowButton
            });
            button.addClass("followButton")

            div.append(img)
            div.append(userName)
            div.append(button)

            $('.profile-container').append(div)
        }
    })

    //browse page. button follow to followed
    function ClickFollowButton() {
        if ($(this).css('background-color') === 'rgb(255, 255, 255)') {
            $(this).text("Follow");
            $(this).css({"background-color": "purple", "color": "white"});
        } else {
            $(this).text("Followed");
            $(this).css({"background-color": "white", "color": "purple"});

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
    function ClickLikeButton() {
        if ($(this).css('background-color') === 'rgb(1, 87, 155)') {
            $(this).css('background-color','#868184');
        } else {
            $(this).css('background-color','#01579B');
        }
    }

});
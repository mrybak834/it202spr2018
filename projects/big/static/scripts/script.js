// https://api.tumblr.com/v2/blog/blackpplluvtshirts.tumblr.com/posts/photo?api_key=VV08xHlettWixKTtehz4B2h6jnBbIIB4mTsswmxLGb8eT8CXdh
// https://api.tumblr.com/v2/blog/blackpplluvtshirts.tumblr.com/posts/text?api_key=VV08xHlettWixKTtehz4B2h6jnBbIIB4mTsswmxLGb8eT8CXdh&filter=text
$(document).ready(function() {
    console.log('ready!');
    var userBlog = '';
    var compBlog = '';

    // $('#results').toggleClass('hidden');
    // $('#start').toggleClass('hidden');
    // $('#profile').toggle();

    // Submit personal blog
    $('#user-submit').click(function() {
        userBlog = $('#user-blog-input').val();
        console.log(userBlog);

        // Hide personal, show comp text field
        $('#user-form-field').toggleClass('hidden');
        $('#comp-form-field').toggleClass('hidden');
    });

    $('#comp-submit').click(function() {
        compBlog = $('#comp-blog-input').val();
        console.log(compBlog);

        // Hide comp and , show results page
        $('#comp-form-field').toggleClass('hidden');
    });
});

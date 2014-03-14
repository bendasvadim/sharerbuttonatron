#sharerbuttonatron

Helps put together sharer links for Twitter and Facebook

HTML for your links should be something like:

```html
<a href="#" class="twitter" target="_blank" data-text="Tweet text" data-url="http://urltoshare.tld" data-hashtags="hashtags,comma,separated" data-via="twitterhandle" data-related="twitterhandles,comma,separated">
    Share on Twitter (opens in a new window or tab)
</a>

<a href="#" class="facebook" target="_blank" data-name="link name" data-link="http://urltoshare.tld" data-picture="http://urlforimage.tld" data-caption="caption for share" data-description="full description for share">
    Share on Facebook (opens in a new window or tab)
</a>
```

Set up your javascript similar to:

```javascript
$('a.twitter').on('click', function(e) {
    e.preventDefault();
    sharerbuttonatron.twitter($(this));
});

$('a.facebook').on('click', function(e) {
    e.preventDefault();
    sharerbuttonatron.facebook($(this));
});
```

You can always call the functions directly without them working from a click by the following:

Just set the first option to 'false' to state you don't want the link building from an element's data attributes.

```javascript
    sharerbuttonatron.twitter(false, text, url, hashtags, via, related, forceLink);

    sharerbuttonatron.facebook(false, name, link, picture, caption, description);
```

That's it.


##Requirements

* jQuery. Obviously.
* Facebook scripts. You'll need an 'app' setting up to allow the sharer to work. Apps can be set up at the Facebook developers site. Then you'll want to init the Facebook stuff at the very top of your ```<body>```


```html
<!-- FB init -->
<div id="fb-root"></div>
<script>
    window.fbAsyncInit = function() {
        // init FB JS SDK
        FB.init({
            appId : 'YOURAPPID',
            status : true,
            xfbml : false
        });
    };

    // Load the SDK asynchronously
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>
```

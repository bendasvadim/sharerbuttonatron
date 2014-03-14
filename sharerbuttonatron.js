/*
    Sharerbuttonatron
    Basic URL combinificatortron for facebook/twitter sharer
    Author: Phil Steer, Rckt
*/
sharerbuttonatron = (function () {
    var sharerbuttonatron = { version : "0.2" };

/*
    Twitter link:
    -------------

    $('a.twitter').on('click', function(e) {
        e.preventDefault();
        sharerbuttonatron.twitter($(this));
    });

    -- or passing to function (ie - not clicking on something)

    sharerbuttonatron.twitter(false, text, url, hashtags, via, related, forceLink);

    Facebook link:
    --------------

    $('a.facebook').on('click', function(e) {
        e.preventDefault();
        sharerbuttonatron.facebook($(this));
    });

    sharerbuttonatron.facebook(false, name, link, picture, caption, description);
*/

    function twitter( elem, text, url, hashtags, via, related, forceLink ) {
        /*
            Assumes that text is desired, so will auto attempt to fill from the current page
            Everything else is optional, and if elem is passed it will first try to fetch from data attributes on that element
        */

        //https://dev.twitter.com/docs/intents - see 'Supported Parameters' under 'Tweet or Reply to a Tweet' for more detail

        //start to build the sharing link
        var intentLink = 'https://twitter.com/intent/tweet?';

        //have we clicked on an element?
        if ( elem ) {
            //yes, build link from the elem
            if ( elem.attr('data-text').length > 0 ) {
                //sure, we need to add a shed load of % symbols everywhere.
                text = 'text=' + encodeURIComponent( elem.attr('data-text') );
            } else {
                //just grab the page title so we have some text
                text = 'text=' + encodeURIComponent( $('title').text() );
            }

            //get the sharing URL
            if ( elem.attr('data-url') ) {
                //yep
                url = '&url=' + encodeURIComponent( elem.attr('data-url') );
            } else {
                //nope, no URL
                url = '';
            }

            //do we want to hashtag?
            if ( elem.attr('data-hashtags') ) {
                hashtags = '&hashtags=' + encodeURIComponent( elem.attr('data-hashtags') );
            } else {
                hashtags = '';
            }

            //include via @?
            if ( elem.attr('data-via') ) {
                via = '&via=' + elem.attr('data-via');
            } else {
                via = '';
            }

            //include related twitterings?
            if ( elem.attr('data-related') ) {
                related = '&related=' + encodeURIComponent( elem.attr('data-related') );
            } else {
                related = '';
            }

        } else {
            //just use func params
            //sharer text
            if ( text ) {
                text = 'text=' + encodeURIComponent( text );
            } else {
                console.log('no text parameter passed - required!');
            }

            //shared URL
            if ( url ) {
                url = '&url=' + encodeURIComponent( url );
            } else {
                if ( forceLink === true ) {
                    url = '&url=' + encodeURIComponent( window.location.href + window.location.hash );
                } else {
                    url ='';
                }
            }

            //hashtags
            if ( hashtags ) {
                hashtags = '&hashtags=' + encodeURIComponent( hashtags );
            } else {
                hashtags = '';
            }

            //via @
            if ( via ) {
                via = '&via=' + via;
            } else {
                via = '';
            }

            //related stuff
            if ( related ) {
                related = '&related=' + related;
            } else {
                related = '';
            }

        }

        //time to ram it all together
        intentLink = intentLink + text + url + hashtags + via + related;

        //ok, we have the link so let's go there
        window.open(intentLink, 'Share', 'width=640,height=400,scrollbars=1,menubar=0,status=0,toolbar=0');
    }

    function facebook( elem, name, link, picture, caption, description ) {

        //have we clicked an element
        if ( elem ) {
            //do we have a data attribute for the link name?
            if ( elem.attr('data-name') ) {
                name = elem.attr('data-name');
            } else if ( $('meta[property="og:site_name"]').attr("content") ) {
                //nope, let's try and see if the page has og meta data
                name = $('meta[property="og:site_name"]').attr("content");
            } else {
                //no, let's just not bother
                name = '';
            }

            //nice and simple, grab current url if none supplied
            if ( elem.attr('data-link') ) {
                link = elem.attr('data-link');
                link = link.replace(/\/#(.*)$/, '#$1');
            } else {
                link = ( window.location.href + window.location.hash );
            }

            //do we have a data attribute for the link image?
            if ( elem.attr('data-picture') ) {
                picture = elem.attr('data-picture');
            //no we don't, can we grab it from the og meta tags?
            } else if ( $('meta[property="og:image"]').attr("content") ) {
                picture = $('meta[property="og:image"]').attr("content");
            //nope. no go.
            } else {
                picture = '';
            }

            //do we have a data attribute for the link caption?
            if ( elem.attr('data-caption') ) {
                caption = elem.attr('data-caption');
            //no, look for og meta tag
            } else if ( $('meta[property="og:title"]').attr("content") ) {
                caption = $('meta[property="og:title"]').attr("content");
            //nothing going
            } else {
                caption = '';
            }

            //do we have a data attribute for the link description?
            if ( elem.attr('data-description') ) {
                description = elem.attr('data-description');
            //do we have a meta tag?
            } else if ( $('meta[property="og:description"]').attr("content") ) {
                description = $('meta[property="og:description"]').attr("content");
            //it seems we have nothing
            } else {
                description = '';
            }
        } else {
            //no just use params
            if ( !name ) {
                console.log('no name parameter passed - required!');
                return false;
            }

            if ( !link ) {
                link = ( window.location.href + window.location.hash );
            }

            if ( !picture ) {
                picture = '';
            }

            if ( !caption ) {
                caption = '';
            }

            if ( !description ) {
                description = '';
            }
        }

        //ok, pull it all together and pass the facebook stuff to the facebook thing
        FB.ui({
            method: 'feed',
            name: name,
            link: link,
            picture: picture,
            caption: caption,
            description: description
        }, function(response){});
    }

    //set up the callable stuffs
    sharerbuttonatron.twitter = twitter;
    sharerbuttonatron.facebook = facebook;

    //make the magic happen
    return sharerbuttonatron;
})();

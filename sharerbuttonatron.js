/*
    Sharer
    Basic URL combinificatortron for facebook/twitter sharer
    Author: Phil Steer, Rckt
*/
sharer = (function () {
    var sharer = { version : "0.1" };

    //mebbes works a bit like this
    //$('a.twitter').on('click', function(e) { e.preventDefault(); sharer.twitter($(this), text, url, hashtags, via, related); });
    //$('a.facebook').on('click', function(e) { e.preventDefault(); sharer.facebook($(this), name, link, picture, caption, description); });

    function twitter( elem, text, url, hashtags, via, related ) {
        /*
            Assumes that both text and url are desired, so will auto attempt to fill them from the current page
            Everything else is optional, and if elem is passed it will first try to fetch from data attributes on that element
        */

        //https://dev.twitter.com/docs/intents - see 'Supported Parameters' under 'Tweet or Reply to a Tweet' for more detail
        //start to build the sharing link
        var intentLink = 'https://twitter.com/intent/tweet?';
        //has a tweet content string been passed to us?
        //console.log(text, url, hashtags, via, related, elem);

        if ( elem ) {
            //yes, build link from the elem
            if ( elem.attr('data-text').length > 0 ) {
                //console.log('add text: ', elem.attr('data-text'));
                //sure, we need to add a shed load of % symbols everywhere.
                text = 'text=' + encodeURIComponent( elem.attr('data-text').trim() );
            } else {
                //console.log('no text, title fallback: ', $('title').text());
                //just grab the page title so we have some text
                text = 'text=' + encodeURIComponent( $('title').text().trim() );
            }

            if ( elem.attr('data-url') ) {
                //console.log('add url: ', elem.attr('data-url'));
                //yep
                url = '&url=' + encodeURIComponent( elem.attr('data-url') );
            } else {
                //console.log('no url');
                url = '&url=' + encodeURIComponent( window.location.href );
            }

            if ( elem.attr('data-hashtags') ) {
                //console.log('add hashtags: ', elem.attr('data-hashtags'));
                hashtags = '&hashtags=' + encodeURIComponent( elem.attr('data-hashtags') );
            } else {
                //console.log('no hashtags');
                hashtags = '';
            }

            if ( elem.attr('data-via') ) {
                //console.log('add via: ', elem.attr('data-via'));
                via = '&via=' + elem.attr('data-via');
            } else {
                //console.log('no via');
                via = '';
            }

            if ( elem.attr('data-related') ) {
                //console.log('add related: ', elem.attr('data-related'));
                related = '&related=' + encodeURIComponent( elem.attr('data-related') );
            } else {
                //console.log('no related');
                related = '';
            }

        } else {

            //no just use params
            if ( text ) {
                //console.log('include text: ', text);
                text = 'text=' + encodeURIComponent( text.trim() );
            } else {
                console.log('no text parameter passed - required!');
            }

            if ( url ) {
                //console.log('include url: ', url);
                url = '&url=' + encodeURIComponent( url );
            } else {
                //console.log('include url: ', url);
                url = '&url=' + encodeURIComponent( window.location.href + window.location.hash );
            }

            if ( hashtags ) {
                //console.log('include hashtags: ', hashtags);
                hashtags = '&hashtags=' + encodeURIComponent( hashtags );
            } else {
                //console.log('no hashtags');
                hashtags = '';
            }

            if ( via ) {
                //console.log('include via: ', via);
                via = '&via=' + via;
            } else {
                //console.log('no via');
                via = '';
            }

            if ( related ) {
                //console.log('include related: ', related);
                related = '&related=' + related;
            } else {
                //console.log('no related');
                related = '';
            }

        }

        //time to ram it all together
        intentLink = intentLink + text + url + hashtags + via + related;
        //console.log(intentLink);

        window.open(intentLink, 'Share', 'width=640,height=400,scrollbars=1,menubar=0,status=0,toolbar=0');
    }

    function facebook( elem, name, link, picture, caption, description ) {

        if ( elem ) {
            //do we have a data attribute for the link name?
            if ( elem.attr('data-name') ) {
                name = elem.attr('data-name');
                //console.log('add link name: ', name);
            } else if ( $('meta[property="og:site_name"]').attr("content") ) {
                //nope, let's try and see if the page has og meta data
                name = $('meta[property="og:site_name"]').attr("content");
                //console.log('add link name: ', name);
            } else {
                //no, let's just not bother
                //console.log('no link name');
                name = '';
            }

            //nice and simple, grab current url if none supplied
            if ( elem.attr('data-link') ) {
                link = elem.attr('data-link');
                link = link.replace(/\/#(.*)$/, '#$1');
                //console.log('add link: ', link);
            } else {
                link = ( window.location.href + window.location.hash );
                //console.log('add link: ', link);
            }

            //do we have a data attribute for the link image?
            if ( elem.attr('data-picture') ) {
                picture = elem.attr('data-picture');
                //console.log('add picture: ', picture);
            //no we don't, can we grab it from the og meta tags?
            } else if ( $('meta[property="og:image"]').attr("content") ) {
                picture = $('meta[property="og:image"]').attr("content");
                //console.log('add link picture: ', picture);
            //nope. no go.
            } else {
                //console.log('no picture');
                picture = '';
            }

            //do we have a data attribute for the link caption?
            if ( elem.attr('data-caption') ) {
                caption = elem.attr('data-caption');
                //console.log('add link caption: ', caption);
            //no, look for og meta tag
            } else if ( $('meta[property="og:title"]').attr("content") ) {
                caption = $('meta[property="og:title"]').attr("content");
                //console.log('add link caption: ', caption);
            //nothing going
            } else {
                //console.log('no caption');
                caption = '';
            }

            //do we have a data attribute for the link description?
            if ( elem.attr('data-description') ) {
                description = elem.attr('data-description');
                //console.log('add description: ', description);
            //do we have a meta tag?
            } else if ( $('meta[property="og:description"]').attr("content") ) {
                description = $('meta[property="og:description"]').attr("content");
                //console.log('add link description: ', description);
            //it seems we have nothing
            } else {
                //console.log('no description');
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
                //console.log('include link: ', link);
            }

            if ( !picture ) {
                picture = '';
                //console.log('no picture');
            }

            if ( !caption ) {
                caption = '';
                //console.log('no caption');
            }

            if ( !description ) {
                description = '';
                //console.log('no description');
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

        console.log(name, link, picture, caption, description);
    }

    function facebooksimple() {
        var link = 'http://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent( window.location.href );
        window.open(link, 'Share', 'width=560,height=400,scrollbars=1,menubar=0,status=0,toolbar=0');
    }

    sharer.twitter = twitter;
    sharer.facebook = facebook;
    sharer.facebooksimple = facebooksimple;

    return sharer;
})();

diffbot
=======

Simple client for the Diffbot API

Usage:
```javascript
var Diffbot = require('diffbot'),
    diffbot = new Diffbot('d7bde3fafe30213a331b0f0e65d89b0f');

diffbot
    .article(
        'http://www.vanityfair.com/business/features/2011/04/jack-dorsey-201104',
        { fields: ['links', 'meta'] }
    )
    .then(function(result) {
        console.log(result);
    })
    .fail(function(result) {
        console.log(result.error);
    });

diffbot
    .frontpage('http://prettyspace.tumblr.com/')
    .then(function(result) {
        console.log(result);
    })
    .fail(function(result) {
        console.log(result.error);
    });

diffbot
    .product(
        'http://www.ebay.com/itm/black-Fashion-Potable-4th-Mini-Mp3-Player-Support-FM-Radio-Movie-Player-1042-/291048089539?pt=Other_MP3_Players&hash=item43c3d167c3',
        { fields: ['offerPrice'] }
    )
    .then(function(result) {
        console.log(result);
    })
    .fail(function(result) {
        console.log(result.error);
    });
```

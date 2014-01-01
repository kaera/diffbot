var request = require('request');

var Diffbot = exports.Diffbot =
    function(token) {
        if (!token) {
            throw new Error ('Authorization token is required');
        }
        this.token = token;
    };

/**
 * Sends request to API
 * @param {Object} params
 * @param {Object} [options]
 * @param {Function} callback
 * @private
 */
Diffbot.prototype._request = function(params, options, callback) {

    if (!params.url) {
        throw new Error('The URL is required');
    }

    var url = 'http://api.diffbot.com/v2/' + params.type +
        '?token=' + this.token +
        '&url=' + encodeURIComponent(params.url);

    request(url, function(error, response, body) {
        if (error) {
            callback(error);
        } else {
            callback(false, JSON.parse(body));
        }
    })

};

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

    for (var key in options) {
        url += '&' + key + '=' + options[key];
    }

    request(url, function(error, response, body) {
        if (error) {
            callback(error);
        } else {
            callback(false, JSON.parse(body));
        }
    })

};

/**
 * Fetches article
 * @param {String} url
 * @param {Object} [options], can have keys:
 *      {Array} fields,
 *      {Number} timeout
 * @param {Function} callback
 */
Diffbot.prototype.article = function(url, options, callback) {

    if (typeof options == 'function') {
        callback = options;
        options = {};
    }

    var params = {
        type: 'article',
        url: url
    };

    // TODO: validate options

    this._request(params, options, callback);

};

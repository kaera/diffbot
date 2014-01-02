var request = require('request'),
    vow = require('vow');

function Diffbot(token) {
    if (!token) {
        throw new Error ('Authorization token is required');
    }
    this.token = token;
}

/**
 * Sends request to API
 * @param {Object} params
 * @param {Object} [options]
 * @returns {Promise}
 * @private
 */
Diffbot.prototype._request = function(params, options) {

    var defer = vow.defer();

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
        if (error || response.statusCode != 200) {
            defer.reject(JSON.parse(body));
        } else {
            defer.resolve(JSON.parse(body));
        }
    });

    return defer.promise();

};

/**
 * Fetches article
 * @param {String} url
 * @param {Object} [options], can have keys:
 *      {Array} fields,
 *      {Number} timeout
 * @returns {Promise}
 */
Diffbot.prototype.article = function(url, options) {

    var params = {
        type: 'article',
        url: url
    };

    options || (options = {});

    // TODO: validate options

    return this._request(params, options);

};

/**
 * Fetches frontpage
 * @param {String} url
 * @param {Object} [options], can have keys:
 *      {Number} all (0 | 1),
 *      {Number} timeout
 * @returns {Promise}
 */
Diffbot.prototype.frontpage = function(url, options) {

    var params = {
        type: 'frontpage',
        url: url
    };

    options || (options = {});
    options.format = 'json';

    return this._request(params, options);

};

/**
 * Fetches product
 * @param {String} url
 * @param {Object} [options], can have keys:
 *      {Array} fields,
 *      {Number} timeout
 * @returns {Promise}
 */
Diffbot.prototype.product = function(url, options) {

    var params = {
        type: 'product',
        url: url
    };

    options || (options = {});
    if (options.fields) {
        options.fields = 'products(' + options.fields + ')';
    }

    return this._request(params, options);

};

module.exports = Diffbot;

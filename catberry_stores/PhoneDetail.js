'use strict';

module.exports = PhoneDetail;

//var phonesHelper = require('../lib/helpers/phonesHelper');

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "PhoneDetail" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function PhoneDetail($uhr) {
    this._uhr = $uhr;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
PhoneDetail.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
PhoneDetail.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
PhoneDetail.prototype.load = function () {
    // Here you can do any HTTP requests using this._uhr.
    // Please read details here https://github.com/catberry/catberry-uhr.
    var phoneId = this.$context.state.phoneId;

    if(phoneId) {
        var uri = this.$context.location.clone();
        uri.path = '/phones/' + phoneId + '.json';
        uri.scheme = 'http';

        return this._uhr.get(uri.toString())
            .then(function (result) {
                console.log(result.content);
                return {
                    phone: result.content
                }
            },function (error){
                console.log(error);
                return {};
            });
    } else {
        return {};
    }
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
PhoneDetail.prototype.handleSomeAction = function () {
    // Here you can call this.$context.changed() if you know
    // that remote data source has been changed.
    // Also you can have many handle methods for other actions.
};

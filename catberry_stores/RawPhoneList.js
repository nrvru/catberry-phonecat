'use strict';


/*
 * Возможно будет использоваться в качестве загрузчика информации с сервера
 */



module.exports = RawPhoneList;

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "RawPhoneList" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function RawPhoneList($uhr) {
	this._uhr = $uhr;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
RawPhoneList.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
RawPhoneList.prototype.$lifetime = 60000;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
RawPhoneList.prototype.load = function () {
	// Here you can do any HTTP requests using this._uhr.
	// Please read details here https://github.com/catberry/catberry-uhr.
    var self = this;

    var uri = this.$context.location.clone();
    uri.path = '/phones/phones.json';
    uri.scheme = 'http';

    return this._uhr.get(uri.toString())
        .then(function(result) {
            var rawPhones = phonesHelper.loadFromJson(result.content);
            self.$context.sendAction('PhoneList', 'raw-phones-list-changed', {rawPhonesList: rawPhones});

            return {
                rawPhonesList: rawPhones
            }
        });
};

/**
 * Handles action named "some-action" from any component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
RawPhoneList.prototype.handleSomeAction = function () {
	// Here you can call this.$context.changed() if you know
	// that remote data source has been changed.
	// Also you can have many handle methods for other actions.
};

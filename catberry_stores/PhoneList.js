'use strict';

module.exports = PhoneList;

var phonesHelper = require('../lib/helpers/phonesHelper');

/*
 * This is a Catberry Store file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#stores
 */

/**
 * Creates new instance of the "PhoneList" store.
 * @param {UHR} $uhr Universal HTTP request.
 * @constructor
 */
function PhoneList($uhr) {
	this._uhr = $uhr;
}

/**
 * Current universal HTTP request to do it in isomorphic way.
 * @type {UHR}
 * @private
 */
PhoneList.prototype._uhr = null;

/**
 * Current lifetime of data (in milliseconds) that is returned by this store.
 * @type {number} Lifetime in milliseconds.
 */
PhoneList.prototype.$lifetime = 60000;

PhoneList.prototype.searchText = null;

PhoneList.prototype.orderProp = 'name';

PhoneList.prototype.phones = null;

/**
 * Loads data from remote source.
 * @returns {Promise<Object>|Object|null|undefined} Loaded data.
 */
PhoneList.prototype.load = function () {
	// Here you can do any HTTP requests using this._uhr.
	// Please read details here https://github.com/catberry/catberry-uhr.

    var self = this;

    var uri = this.$context.location.clone();
    uri.path = '/phones/phones.json';
    uri.scheme = 'http';

    return this._uhr.get(uri.toString())
        .then(function(result) {
            //debugger;
            self.phones = phonesHelper.loadFromJson(result.content);
            var filteredPhones = phonesHelper.searchPhonesByName(self.phones, self.searchText);
            var orderedPhones = phonesHelper.orderPhonesByProp(filteredPhones, self.orderProp);
            return {
                phones: orderedPhones,
                allPhones: self.phones,
                searchText: self.searchText,
                orderProp: self.orderProp
            }
        });
};

/**
 * Handles action named "search-text-changed" from phone-list component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
PhoneList.prototype.handleSearchTextChanged = function (args) {
    this.searchText = args.searchText;
    console.log(args);
    console.log(this.searchText);
    console.log(this.phones);
	this.$context.changed();
};

/**
 * Handles action named "order-prop-changed" from phone-list component.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
PhoneList.prototype.handleOrderPropChanged = function (args) {
    this.orderProp = args.orderProp;
    console.log(args);
    console.log(this.orderProp);
    console.log(this.phones);
    this.$context.changed();
};

/**
 * Handles action named "raw-phones-list-changed" from RawPhoneList Store.
 * @returns {Promise<Object>|Object|null|undefined} Response to component.
 */
PhoneList.prototype.handleRawPhonesListChanged = function (args) {
    //this.rawPhonesList = args.rawPhonesList;
    //this.$context.changed();
};
'use strict';

module.exports = PhoneList;

/*
 * This is a Catberry Cat-component file.
 * More details can be found here
 * https://github.com/catberry/catberry/blob/master/docs/index.md#cat-components
 */

/**
 * Creates new instance of the "phone-list" component.
 * @constructor
 */
function PhoneList() {

}

PhoneList.prototype.inputSearchTextElement = null;

PhoneList.prototype.selectOrderPropElement = null;

/**
 * Gets data context for template engine.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Data context
 * for template engine.
 */
PhoneList.prototype.render = function () {
    return this.$context.getStoreData();
};

/**
 * Returns event binding settings for the component.
 * This method is optional.
 * @returns {Promise<Object>|Object|null|undefined} Binding settings.
 */
PhoneList.prototype.bind = function () {
    var self = this;
    this.inputSearchTextElement = this.$context.element.querySelector('input#search');
    this.selectOrderPropElement = this.$context.element.querySelector('select#order-prop');

    this.$context.getStoreData().then(function(data){
        self.setSearchText(data.searchText);
        self.setOrderProp(data.orderProp);
    });

    return {
        keyup: {
            'input#search': this._handleSearchTextChanged
        },
        change: {
            'select#order-prop': this._handleOrderPropChanged
        }
    }
};

PhoneList.prototype._handleSearchTextChanged = function(event){
    event.preventDefault();
    event.stopPropagation();

    this.$context.sendAction('search-text-changed', {
        searchText: this.getSearchText()
    });
};

PhoneList.prototype.getSearchText = function(){
    return this.inputSearchTextElement.value;
};

PhoneList.prototype.setSearchText = function(value){
    this.inputSearchTextElement.value = value;
    this.inputSearchTextElement.focus();
};

PhoneList.prototype._handleOrderPropChanged = function(){
    event.preventDefault();
    event.stopPropagation();

    this.$context.sendAction('order-prop-changed', {
        orderProp: this.getOrderProp()
    });
};

PhoneList.prototype.getOrderProp = function(){
    return this.selectOrderPropElement.value;
};

PhoneList.prototype.setOrderProp = function(value){
    this.selectOrderPropElement.value = value;
};

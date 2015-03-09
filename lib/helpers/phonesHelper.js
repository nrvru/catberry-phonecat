'use strict';

var Phone = require('../Phone');

module.exports = {
    loadFromJson: function(data){
        var collection = [];
        data = data || [];

        data.forEach(function(item){
            collection.push(new Phone(item));
        });

        return collection;
    },

    searchPhonesByName: function(phones, searchText){
        if(searchText) {
            return phones.filter(function (phone) {
                return phone.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            });
        } else {
            return phones;
        }
    },

    orderPhonesByProp: function(phones, orderProp){
        var orderedPhones = phones.slice(0);
        if(orderProp) {
            return orderedPhones.sort(function (a, b) {
                if (a[orderProp] < b[orderProp]) {
                    return -1;
                }
                if (a[orderProp] > b[orderProp]) {
                    return 1;
                }
                return 0;
            });
        } else {
            return orderedPhones;
        }
    }
};
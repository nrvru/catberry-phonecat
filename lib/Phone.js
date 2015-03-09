'use strict';

module.exports = Phone;

function Phone(phone){
    this.age = phone.age || null;
    this.id = phone.id || '';
    this.name = phone.name || '';
    this.snippet = phone.snippet || '';
    this.carrier = phone.carrier || '';
    this.imageUrl = phone.imageUrl || '';
}
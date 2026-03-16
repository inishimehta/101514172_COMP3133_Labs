"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this._age = age;
    }
    greeter() {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }
    GetAge() {
        console.log(`Age: ${this._age}`);
        return this._age;
    }
}
exports.Customer = Customer;

class Customer {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    greeter() {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }
}
let customer = new Customer("John", "Smith");
customer.greeter();

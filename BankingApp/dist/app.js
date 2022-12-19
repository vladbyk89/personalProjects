var bankAccounts = [];
var userName = document.querySelector("#name");
var userDateOfBirth = document.querySelector("#dob");
var userBalance = document.querySelector("#balance");
var signUpBtn = document.querySelector('#signUp');
function Account(name, dob, balance) {
    this.fullName = name;
    this.dateOfBirth = dob;
    this.balance = balance;
}
var person = new Account("Vladi Bykanov", "19-11-1989", 10000);
console.log(person);

let bankAccounts = [];
const userName = document.querySelector("#name") as HTMLInputElement | null;
const userDateOfBirth = document.querySelector(
  "#dob"
) as HTMLInputElement | null;
const userBalance = document.querySelector(
  "#balance"
) as HTMLInputElement | null;
const signUpBtn = document.querySelector('#signUp')

function Account(name: string, dob: string, balance: number) {
  this.fullName = name;
  this.dateOfBirth = dob;
  this.balance = balance;
}

const person = new Account("Vladi Bykanov", "19-11-1989", 10000);

console.log(person);

/*
 * Homework #2: Variables and Constants
 * Keeping Up With the Javascripts - Part 1: ES6
 * Pirple
 * 
 * Alejandro Mohamad
 */

// Q: What are the differences between let, const and var?
// When would each be appropriate to use?

// A: The three of them are variables, used to save values. The difference is
// that const is a value that is assigned and can't be changed. let and var can
// be changed, but they are different. The difference is scope. They can be
// both global varibales, but var is in the scope of a function, and let is in
// the scope of the enclosing block (ie: object, if, for, while).

console.log("Example of const:");
const name = "Alejandro Mohamad";
// name = "Pirple Student";
console.log(name);

var varItem = 34;
let letItem = 23;

function scopeFunc() {
  console.log("\nScope of var:");
  var varItem = 14;
  if (true) {
      var varItem = 93;
      console.log(varItem); // 93
  }
  console.log(varItem); // 93
}

function scopeBlock() {
  console.log("\nScope of let:");
  let letItem = 14;
  if (true) {
      let letItem = 93;
      console.log(letItem); // 93
  }
  console.log(letItem); // 14
}

scopeFunc();
scopeBlock();

console.log("\nGloabl scope of var & let:");
console.log(varItem); // 34
console.log(letItem); // 23

// ---------------------

// EXTRA CREDIT
// Q: What is hoisting? What does the word mean,
// and how does hoisting work in Javascript?

// A: Hoisting is the default behavior of JavaScript to move all variable
// declarations to the top of the scope (script file or function definition).
// It's important to note that hoisting only works with var, not let and const.

value = 8; // assigning value to a not pre-defined variable
console.log("\nHoisting");
console.log(value); // display of the variable's value
var value; // defining variable

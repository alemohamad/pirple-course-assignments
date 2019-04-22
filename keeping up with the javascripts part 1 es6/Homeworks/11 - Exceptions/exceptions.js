/*
 * Homework #11: Exceptions
 * Keeping Up With the Javascripts - Part 1: ES6
 * Pirple
 * 
 * Alejandro Mohamad
 */

/*
 * When called successfully, the function:
 * 
 * 1. Accepts one parameter: a string. A JSON-stringified version of a Javascript Array.
 * 2. Parses the JSON to obtain the Array
 * 3. Reverses the order of the the items in the Array
 * 4. JSON-stringifies the result, and returns it.
 */

function reverseJsonArray(jsonString) {
  try {
    const arrayObj = JSON.parse(jsonString);
    arrayObj.reverse();
    return JSON.stringify(arrayObj);
  } catch(e) {
    return false;
  }
}

// Examples

let correct = reverseJsonArray('["a","b","c"]'); // return '["c","b","a"]'
console.log(correct);

let wrong = reverseJsonArray(123); // return false
console.log(wrong);



/*
 * Extra Credit
 */

// 1. Without any arguments
let noargs = reverseJsonArray(); // return false
console.log(noargs);

// 2. With a boolean as the argument
let truearg = reverseJsonArray(true); // return false
console.log(truearg);

// 3. With an Array (non-stringified) as the argument
let arrayarg = reverseJsonArray(["a", "b", "c"]); // return false
console.log(arrayarg);

// 4. With a string argument that is not properly formatted JSON
let nojsonarg = reverseJsonArray('no { json ][ string }'); // return false
console.log(nojsonarg);

// 5. With a stringified-array that only has one value
let onevalue = reverseJsonArray('["a"]'); // return '["a"]'
console.log(onevalue);

// 6. With a stringified-array that is empty
let emptyvalue = reverseJsonArray('[]'); // return '[]'
console.log(emptyvalue);

// 7. With a stringified-array that has an even-number of values
let evenvalue = reverseJsonArray('["a", "b"]'); // return '["b", "a"]'
console.log(evenvalue);

// 8. With a stringified-array that has an odd-number of values
let oddvalue = reverseJsonArray('["a", "b", "c", "d", "e"]'); // return '["e", "d", "c", "b", "a"]'
console.log(oddvalue);

/*
 * Homework #14: Callbacks and Promises
 * Keeping Up With the Javascripts - Part 1: ES6
 * Pirple
 * 
 * Alejandro Mohamad
 */

/*
 * Create two different scripts. One will contain the callback-centered code, and the other the promises-centered code.
 * The two scripts should contain the same functionality, and solve the same problems.
 * 
 * Each script should expose a function that accepts one argument: an integer between 1 and 1000 called "num".
 * When that function is called, the following steps should happen for "num" in order:
 * 
 * 1. Calculate the square of num and log it to the console
 * 2. Wait "num" milliseconds
 * 3. Calculate the square root of num and log it to the console
 * 4. Determine the prime-number that is closest to num without being greater than or equal to num, and then log it to the console
 * 5. Count the total elapsed time from when the original function was called until the last step was completed, and log that to
 *    the console as well.
 */

const getClosestLowerPrimeNumber = (end) => {
  var primes = [];

  for (var number = 1; number < end; number++) {
      var primeNumberDividers = [];
      for (var divider = 1; divider <= number; divider++) {
          if (number % divider === 0) {
              primeNumberDividers.push(divider);
          }
      }

      if (primeNumberDividers.length === 2) {
          primes.push(number);
      }
  }

  return primes.pop();
}

const squareNum = (num) => {
  return new Promise((resolve, reject) => {
    if (num < 1 || num > 1000) {
      reject("The number must be between 1 and 1000!");
    } else {
      let squareNumber = Math.pow(num, 2);
      console.log(`The square of num is ${squareNumber}`);
      resolve();
    }
  });
};

const squareRootNum = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout( () => {
      let squareRootNumber = Math.sqrt(num);
      console.log(`The square root of num is ${squareRootNumber}`);
      resolve();
    }, num);
  });
};

const closestLowerPrimeNum = (num) => {
  return new Promise((resolve, reject) => {
    let closest = getClosestLowerPrimeNumber(num);
    console.log(`The closest lower prime number of num is ${closest}`);
    resolve();
  });
};

const getDiffTimeSince = (startTime) => {
  let endTime = new Date();
  var timeDiff = endTime - startTime;
  console.log(`The script took ${timeDiff} ms`);
};

const promiseScript = (num) => {
  let startTime = new Date();

  squareNum(num)
    .then( () => squareRootNum(num))
    .then( () => closestLowerPrimeNum(num))
    .then( () => getDiffTimeSince(startTime))
    .catch( (errorMessage) => console.log(errorMessage));
};

promiseScript(850);

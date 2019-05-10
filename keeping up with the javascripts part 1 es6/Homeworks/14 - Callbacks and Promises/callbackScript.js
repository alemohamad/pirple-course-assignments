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

const squareNum = (num, cb) => {
  let squareNumber = Math.pow(num, 2);
  console.log(`The square of num is ${squareNumber}`);
  cb(squareNumber);
};

const squareRootNum = (num, cb) => {
  setTimeout( () => {
    let squareRootNumber = Math.sqrt(num);
    console.log(`The square root of num is ${squareRootNumber}`);
    cb(squareRootNumber);
  }, num);
};

const closestLowerPrimeNum = (num, cb) => {
  let closest = getClosestLowerPrimeNumber(num);
  console.log(`The closest lower prime number of num is ${closest}`);
  cb(closest);
};

const getDiffTimeSince = (startTime) => {
  let endTime = new Date();
  var timeDiff = endTime - startTime;
  console.log(`The script took ${timeDiff} ms`);
};

const callbackScript = (num) => {
  if (num < 1 || num > 1000) {
    console.log("The number must be between 1 and 1000!");
    return;
  }

  let startTime = new Date();

  squareNum(num, () => {
    squareRootNum(num, () => {
      closestLowerPrimeNum(num, () => {
        getDiffTimeSince(startTime);
      });
    });
  });
};

callbackScript(850);

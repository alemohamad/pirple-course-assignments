/*
 * Homework #5: Switch Statements
 * Keeping Up With the Javascripts - Part 1: ES6
 * Pirple
 * 
 * Create a function called "timeAdder" that can add two time values together.
 * For example, it should be able to add 25 hours and 3 days together.
 * 
 * Alejandro Mohamad
 */

/*
 * Requirements:
 * 1. Your function should include at least one switch
 * 2. Your function must accept any possible combination of inputs 
 * 3. If the inputs are valid, it should return an array with 2 variables inside of it: value3, and  label3.
 * 4. If the inputs are invalid or impossible, it should return false.
 */

const isInteger = (value) => !isNaN(value) && value >= 0;

const validLabels = ["seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"];
const isLabelInList = (label) => validLabels.indexOf(label) !== -1;

const isValidLabel = (value, label) => {
  switch (label) {
    case "second":
    case "minute":
    case "hour":
    case "day":
      return (value === 1) ? true : false;
    case "seconds":
    case "minutes":
    case "hours":
    case "days":
      return (value === 1) ? false : true;
    default:
      console.log("Label not valid.");
      return false;
  }
}

const minuteSeconds = 60;
const hourSeconds = minuteSeconds * 60;
const daySeconds = hourSeconds * 24;

const convertToSeconds = (value, label) => {
  switch (label) {
    case "second":
    case "seconds":
      return value;
    case "minute":
    case "minutes":
      return value * minuteSeconds;
    case "hour":
    case "hours":
      return value * hourSeconds;
    case "day":
    case "days":
      return value * daySeconds;
    default:
      console.log("Can't convert to seconds.");
      return false;
  }
}

const convertToLarger = (seconds) => {
  if (seconds % daySeconds === 0) {
    const days = seconds / daySeconds;
    return (days === 1) ? [days, 'day'] : [days, 'days'];
  } else if (seconds % hourSeconds === 0) {
    const hours = seconds / hourSeconds;
    return (hours === 1) ? [hours, 'hour'] : [hours, 'hours'];
  } else if (seconds % minuteSeconds === 0) {
    const minutes = seconds / minuteSeconds;
    return (minutes === 1) ? [minutes, 'minute'] : [minutes, 'minutes'];
  } else {
    return (seconds === 1) ? [seconds, 'second'] : [seconds, 'seconds'];
  }
}

const timeAdder = (value1, label1, value2, label2) => {
  // check values
  if (!isInteger(value1)) {
    return false;
  }

  if (!isInteger(value2)) {
    return false;
  }

  // check labels
  if (!isLabelInList(label1)) {
    return false;
  }

  if (!isLabelInList(label2)) {
    return false;
  }

  // check values and labels
  if (!isValidLabel(value1, label1)) {
    return false;
  }

  if (!isValidLabel(value2, label2)) {
    return false;
  }

  // convert values to seconds
  const seconds1 = convertToSeconds(value1, label1);
  const seconds2 = convertToSeconds(value2, label2);

  // add seconds
  const result = seconds1 + seconds2;

  // return the value in larger possible format
  return convertToLarger(result);
}

// Correct
console.log(timeAdder( 1, "minute",   3, "minutes"));
console.log(timeAdder( 5, "days",    25, "hours"));
console.log(timeAdder( 1, "minute", 240, "seconds"));

// Other Correct
console.log(timeAdder( 1, "minute",  59, "minutes"));
console.log(timeAdder(23, "seconds",  7, "seconds"));
console.log(timeAdder( 7, "hours",    0, "days"));
console.log(timeAdder( 1, "second",   0, "seconds"));

// Wrong
console.log(timeAdder(5, "hour", 5, "minutes")); // This is impossible because "hour" is singular and 5 is plural
console.log(timeAdder(false, false, 5, "minutes")); // This is invalid because the first 2 arguments are not the correct types
console.log(timeAdder({}, "days", 5, "minutes")); // This is invalid because the first argument is the wrong type

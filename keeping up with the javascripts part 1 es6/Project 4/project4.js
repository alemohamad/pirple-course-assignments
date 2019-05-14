/*
 * Project #4
 * Keeping Up With the Javascripts - Part 1: ES6
 * Pirple
 * 
 * Alejandro Mohamad
 */

exports.square = function(event, context, callback) {
  const square = Math.pow(parseInt(event.number), 2);

  console.log({"square": square});
}

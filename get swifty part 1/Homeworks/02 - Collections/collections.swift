/*
 *  Homework #2: Collections
 *  Get Swifty - Part 1
 *  Pirple
 *
 *  Alejandro Mohamad
 */

// Q: What are the differences between a tuple and an array?
// When would each be appropriate too use? In your own words,
// write 1 - 2 paragraphs explaining the different use-cases for each.

// A: THe main difference is that a tuple is a grouping of type values
// separated by commas and encolsed in parentheses; and an array is an
// ordered collection of values.

let positionTuple = (top: 10, right: 8, bottom: 12, left: 14)
let namesArray: [String] = ["Alex", "Ryan", "Emma", "Ava", "Michael"]

print(positionTuple)
print(positionTuple.bottom) // 12

print(namesArray)
print(namesArray[2]) // Emma

// ---------------------

// EXTRA CREDIT
// Q: What are ranges? And why would you use one instead of
// an array or tuple?

// A: Ranges are structures that have a start index and an end index
// (which may not be included in the range). The best case to use this
// instead of an array or tuple, is to list a range of values, and
// not have to define all of them

1...10
1..<10

let exampleRange = 1...10

for item in exampleRange {
    print(item)
}

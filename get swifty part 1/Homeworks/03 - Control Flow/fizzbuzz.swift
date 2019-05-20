/*
 *  Homework #3: Control Flow
 *  Get Swifty - Part 1
 *  Pirple
 *
 *  Write a program that prints the numbers from 1 to 100. But for
 *  multiples of three print "Fizz" instead of the number and for the
 *  multiples of five print "Buzz". For numbers which are multiples of
 *  both three and five print "FizzBuzz".
 *
 *  Alejandro Mohamad
 */

func prime(_ number: Int) -> Bool {
    return (1...number).filter({number % $0 == 0}).count <= 2
}

for number in 1...100 {
    if prime(number) {
        print("Prime")
    } else if number % 3 == 0 && number % 5 == 0 {
        print("FizzBuzz")
    } else if number % 3 == 0 {
        print("Fizz")
    } else if number % 5 == 0 {
        print("Buzz")
    } else {
        print(number)
    }
}

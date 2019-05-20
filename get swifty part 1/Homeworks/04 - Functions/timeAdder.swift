/*
 *  Homework #4: Functions
 *  Get Swifty - Part 1
 *  Pirple
 *
 *  Alejandro Mohamad
 */

/*
 * Requirements:
 * 1. Your function should include at least one switch
 * 2. Your function must accept any possible combination of inputs
 * 3. If the inputs are valid, it should return a tuple with 2 variables
      inside of it: value3, and  label3.
 * 4. If the inputs are invalid or impossible, it should return false.
 */

let validLabels = ["seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"]

let minuteSeconds = 60
let hourSeconds = minuteSeconds * 60
let daySeconds = hourSeconds * 24

func isValidLabel(value: Int, label: String) -> Bool {
    switch (label) {
    case "second", "minute", "hour", "day":
        return value == 1 ? true : false
    case "seconds", "minutes", "hours", "days":
        return value == 1 ? false : true
    default:
        print("Label not valid.")
        return false
    }
}

func convertToSeconds(value: Int, label: String) -> Int? {
    switch (label) {
    case "second","seconds":
        return value;
    case "minute", "minutes":
        return value * minuteSeconds;
    case "hour", "hours":
        return value * hourSeconds;
    case "day", "days":
        return value * daySeconds
    default:
        print("Can't convert to seconds.")
        return nil
    }
}

func convertToLarger(seconds: Int) -> (Int, String) {
    if seconds % daySeconds == 0 {
        let days = seconds / daySeconds
        return days == 1 ? (days, "day") : (days, "days")
    } else if seconds % hourSeconds == 0 {
        let hours = seconds / hourSeconds
        return hours == 1 ? (hours, "hour") : (hours, "hours")
    } else if seconds % minuteSeconds == 0 {
        let minutes = seconds / minuteSeconds
        return minutes == 1 ? (minutes, "minute") : (minutes, "minutes")
    } else {
        return seconds == 1 ? (seconds, "second") : (seconds, "seconds")
    }
}

func timeAdder(_ value1: Int, _ label1: String, _ value2: Int, _ label2: String) -> (Int, String)? {
    // check labels
    if !validLabels.contains(label1) {
        return nil
    }
    if !validLabels.contains(label2) {
        return nil
    }
    
    // check values and labels
    if !isValidLabel(value: value1, label: label1) {
        return nil
    }
    if !isValidLabel(value: value2, label: label2) {
        return nil
    }
    
    // convert values to seconds
    guard let seconds1 = convertToSeconds(value: value1, label: label1),
        let seconds2 = convertToSeconds(value: value2, label: label2) else {
        return nil
    }
    
    // add seconds
    let result = seconds1 + seconds2
    
    // return the value in larger possible format
    return convertToLarger(seconds: result)
}

// Correct
timeAdder(1, "minute",   3, "minutes")
timeAdder(5,   "days",  25,   "hours")
timeAdder(1, "minute", 240, "seconds")

// Other Correct
timeAdder(20,   "hours",  4,   "hours")
timeAdder(20,   "hours",  5,   "hours")
timeAdder( 1,  "minute", 59, "minutes")
timeAdder(23, "seconds",  7, "seconds")
timeAdder( 7,   "hours",  0,    "days")
timeAdder( 1,  "second",  0, "seconds")

// Wrong
timeAdder(5, "hour", 5, "minutes") // This is impossible because "hour" is singular and 5 is plural
// timeAdder(false, false, 5, "minutes") // Xcode won't allow this, because the parameters are expecting an Int or a String
// timeAdder({}, "days", 5, "minutes") // Xcode won't allow this, because the parameters are expecting an Int or a String

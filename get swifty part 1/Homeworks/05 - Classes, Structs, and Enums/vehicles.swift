/*
 *  Homework #5: Classes, Structs, and Enums
 *  Get Swifty - Part 1
 *  Pirple
 *
 *  Alejandro Mohamad
 */

class Vehicle {
    var make: String
    var model: String
    var year: Int
    var weight: Int
    
    var needsMaintenance = false
    var tripsSinceMaintenance = 0
    
    init(make: String, model: String, year: Int, weight: Int) {
        self.make = make
        self.model = model
        self.year = year
        self.weight = weight
    }
    
    func repair() {
        needsMaintenance = false
        tripsSinceMaintenance = 0
    }
    
    func displayInformation() {
        print("Make: \(make)")
        print("Model: \(model)")
        print("Year: \(year)")
        print("Weight: \(weight)")
        print("- Needs maintenance: \(needsMaintenance)")
        print("- Trips since maintenance: \(tripsSinceMaintenance)")
        print("------")
    }
}

class Cars: Vehicle {
    var isDriving = false
    
    func drive() {
        isDriving = true
    }
    
    func stop() {
        isDriving = false
        tripsSinceMaintenance += 1
        
        if tripsSinceMaintenance == 100 {
            needsMaintenance = true
        }
    }
}

let tesla = Cars(make: "Tesla", model: "Model X", year: 2015, weight: 2300)
let subaru = Cars(make: "Subaru", model: "XV", year: 2011, weight: 2200)
let citroen = Cars(make: "Citroën", model: "C3", year: 2001, weight: 1005)

for _ in 1..<10 {
    tesla.drive()
    tesla.stop()
}

for _ in 1..<58 {
    subaru.drive()
    subaru.stop()
}

for _ in 1..<112 {
    citroen.drive()
    citroen.stop()
}

tesla.displayInformation()
subaru.displayInformation()
citroen.displayInformation()

citroen.repair()
citroen.displayInformation()

/*
 * Extra Credit
 */

class Planes: Vehicle {
    var isFlying = false
    
    func flying() {
        if needsMaintenance {
            print("The plane \(make) \(model) can't fly until it's repaired")
            return
        }
        
        isFlying = true
    }
    
    func landing() {
        if isFlying == false {
            return
        }
        
        isFlying = false
        tripsSinceMaintenance += 1
        
        if tripsSinceMaintenance == 100 {
            needsMaintenance = true
        }
    }
}

let airbus = Planes(make: "Airbus", model: "A350", year: 2013, weight: 45000)
let boeing = Planes(make: "Boeing", model: "787", year: 2009, weight: 60000)

for _ in 1..<70 {
    airbus.flying()
    airbus.landing()
}

for _ in 1..<103 {
    boeing.flying()
    boeing.landing()
}

airbus.displayInformation()
boeing.displayInformation()

boeing.flying()

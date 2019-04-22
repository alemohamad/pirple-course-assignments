/*
 * Homework #13: Classes
 * Keeping Up With the Javascripts - Part 1: ES6
 * Pirple
 * 
 * Alejandro Mohamad
 */

class Vehicle {
  constructor(make, model, year, weight) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.needsMaintenance = false;
    this.tripsSinceMaintenance = 0;
  }

  resetMaintenance() {
    this.needsMaintenance = false;
    this.tripsSinceMaintenance = 0;
  }

  repair() {
    this.resetMaintenance();
  }

  displayInformation() {
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight}`);
    console.log(`- Needs maintenance: ${this.needsMaintenance}`);
    console.log(`- Trips since maintenance: ${this.tripsSinceMaintenance}`);
    console.log(`------`);
  }
}

class Cars extends Vehicle {
  drive() {
    this.isDriving = true;
  }
  stop() {
    this.isDriving = false;
    this.tripsSinceMaintenance += 1;

    if (this.tripsSinceMaintenance === 100) {
      this.needsMaintenance = true;
    }
  }
}

const tesla = new Cars('Tesla', 'Model X', 2015, 2300);
const subaru = new Cars('Subaru', 'XV', 2011, 2200);
const citroen = new Cars('Citroën', 'C3', 2001, 1005);

for (let i = 0; i < 10; i++) {
  tesla.drive();
  tesla.stop();
}

for (let i = 0; i < 58; i++) {
  subaru.drive();
  subaru.stop();
}

for (let i = 0; i < 112; i++) {
  citroen.drive();
  citroen.stop();
}

tesla.displayInformation();
subaru.displayInformation();
citroen.displayInformation();

citroen.repair();
citroen.displayInformation();

/*
 * Extra Credit
 */

class Planes extends Vehicle {
  flying() {
    if (this.needsMaintenance) {
      console.log(`The plane ${this.make} ${this.model} can't fly until it's repaired`);
      return false;
    }

    this.isFlying = true;
  }
  landing() {
    if (this.isFlying === false) {
      return false;
    }

    this.isFlying = false;
    this.tripsSinceMaintenance += 1;

    if (this.tripsSinceMaintenance === 100) {
      this.needsMaintenance = true;
    }
  }
}

const airbus = new Planes('Airbus', 'A350', 2013, 45000);
const boeing = new Planes('Boeing', '787', 2009, 60000);

for (let i = 0; i < 70; i++) {
  airbus.flying();
  airbus.landing();
}

for (let i = 0; i < 103; i++) {
  boeing.flying();
  boeing.landing();
}

airbus.displayInformation();
boeing.displayInformation();

boeing.flying();

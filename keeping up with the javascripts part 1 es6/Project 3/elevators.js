/*
 * Project #3
 * Keeping Up With the Javascripts - Part 1: ES6
 * Pirple
 * 
 * Alejandro Mohamad
 */

/*
 * You've been hired by a construction firm to help build the "brain"
 * for a set of elevators in a new building. Your task is to write
 * the code that will control the elevators, and tell each elevator
 * which floor to travel to next.
 */

const SECOND = 1000;
const UP = 1;
const DOWN = -1;

class Elevator {

  constructor(name, minFloor, maxFloor) {
    this.name = name;
    this.minFloor = minFloor;
    this.maxFloor = maxFloor;

    this.currentFloor = 0;

    this.originFloor = null;
    this.destinationFloor = null;

    this.emergencyStopped = false;
    this.isMoving = false;
    this.direction = UP;
    this.doorsAreOpen = true;
  }

  moveToFloor(origin, destination) {
    this.closeDoors();

    this.originFloor = origin;
    this.destinationFloor = destination;

    this.checkDirection();

    this.isMoving = true;
    this.moveOneFloor();
  }

  canMoveToFloor(destination) {
    return (this.minFloor <= destination && this.maxFloor >= destination
      && !this.isMoving && !this.emergencyStopped);
  }

  getDestination() {
    this.checkDirection();
    this.checkCurrentFloor();

    if (this.originFloor !== null) {
      return this.originFloor;
    } else if (this.destinationFloor !== null) {
      return this.destinationFloor;
    } else {
      return false;
    }
  }

  checkDirection() {
    if (this.originFloor !== null) {
      this.direction = (this.originFloor >= this.currentFloor) ? UP : DOWN;
    } else if (this.destinationFloor !== null) {
      this.direction = (this.destinationFloor >= this.currentFloor) ? UP : DOWN;
    } else {
      this.direction = UP;
    }
  }

  checkCurrentFloor() {
    if (this.originFloor === this.currentFloor) {
      this.originFloor = null;
      this.openDoors();
    }

    if (this.originFloor === null
      && this.destinationFloor === this.currentFloor) {
      this.destinationFloor = null;
    }
  }

  moveOneFloor() {
    this.closeDoors();
    let thisElement = this;

    setTimeout( () => {
      let destination = thisElement.getDestination();
      if (destination === false) {
        return;
      }

      thisElement.currentFloor += thisElement.direction;

      if (destination != thisElement.currentFloor) {
        thisElement.moveOneFloor();
      } else {
        thisElement.checkIfArrived();
      }
    }, SECOND);
  }

  checkIfArrived() {
    logAction(`${this.name} move to ${this.currentFloor}`);

    if (this.getDestination() === false) {
      this.arrived();
    } else {
      this.originFloor = null;
      this.moveOneFloor();
    }
  }

  arrived() {
    this.isMoving = false;
    this.openDoors();
  }

  openDoors() {
    if (this.doorsAreOpen) { return; }

    this.doorsAreOpen = true;
    logAction(`${this.name} open doors`);
  }

  closeDoors() {
    if (!this.doorsAreOpen) { return; }

    this.doorsAreOpen = false;
    logAction(`${this.name} close doors`);
  }

  emergencyStop() {
    this.isMoving = false;
    this.openDoors();
    this.originFloor = null;
    this.destinationFloor = null;
    this.emergencyStopped = true;
  }

  resetEmergencyStop() {
    this.emergencyStopped = false;
  }
}

class Building {

  constructor(min = -1, max = 10) {
    this.floors = [];
    this.elevators = [];
    this.prepareBuildingFloors(min, max);
  }

  prepareBuildingFloors(min, max) {
    // check if the min and max floors are switched
    if (min > max) {
      let tempMin = min;
      min = max;
      max = tempMin;
    }

    for (let i = min; i <= max; i++) {
      this.floors.push(i);
    }
  }

  addElevator(elevator) {
    this.elevators.push(elevator);
  }

  callElevator(origin, destination) {
    logAction(`\n~ Call elevator to travel from #${origin} to #${destination}`);

    // get nearest elevator
    let elevator = this.getNearPossibleElevator(origin, destination);

    logAction(`${elevator.name} is on floor ${elevator.currentFloor}`);

    // move chosen elevator to destination
    elevator.moveToFloor(origin, destination);
  }

  getNearPossibleElevator(origin, destination) {
    let floorDiff = this.floors.length;
    let selectedElevator = null;

    this.elevators.forEach(elevator => {
      if (!elevator.canMoveToFloor(destination)) { return; }

      let elevatorDiff = Math.abs(elevator.currentFloor - origin);
      if (elevatorDiff < floorDiff) {
        floorDiff = elevatorDiff;
        selectedElevator = elevator;
      }
    });

    return selectedElevator;
  }

  getElevatorsStatus() {
    this.elevators.forEach(elevator => {
      logAction(`\t# Elevator ${elevator.name} is at floor ${elevator.currentFloor}`);
    });
  }
}

const logAction = (message) => {
  console.log(message);
};


// create elevators
const elevatorA = new Elevator('A', -1, 9);
const elevatorB = new Elevator('B', 0, 10);

// create building and adding elevators
const building = new Building(-1, 10);
building.addElevator(elevatorA);
building.addElevator(elevatorB);

// check if everything's correct
logAction(building.floors);
building.getElevatorsStatus();

// start moving the elevators
setTimeout( () => { building.callElevator( 3,  0); },  0 * SECOND);
setTimeout( () => { building.callElevator( 9, -1); }, 10 * SECOND); // only elevator A
setTimeout( () => { building.callElevator( 7, 10); }, 40 * SECOND); // only elevator B
setTimeout( () => { building.callElevator( 0,  7); }, 30 * SECOND);
setTimeout( () => { building.callElevator( 2,  9); }, 50 * SECOND);
setTimeout( () => { building.callElevator( 1,  3); }, 70 * SECOND);

// check final elevator's floors
setTimeout( () => { building.getElevatorsStatus(); }, 80 * SECOND);

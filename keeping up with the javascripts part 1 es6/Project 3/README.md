# Keeping Up With the Javascripts - Part 1: ES6

## Project 3

**Screencast:** [https://vimeo.com/album/5932648/video/335184530](https://vimeo.com/album/5932648/video/335184530)

## Instructions

You've been hired by a construction firm to help build the "brain" for a set of elevators in a new building. Your task is to write the code that will control the elevators, and tell each elevator which floor to travel to next.

### Create a building

The building is the main brain of the elevator system. The constructor has the min floor and the max floor available.

```javascript
const building = new Building(-1, 10);
```

### Create elevators

Create the elevator objects. The constructor has a name, the min floor and the max floor it can ride.

```javascript
const elevatorA = new Elevator('A', -1,  9);
const elevatorB = new Elevator('B',  0, 10);
```

### Add elevators to building

We pass each elevator to add it to the building.

```javascript
building.addElevator(elevatorA);
building.addElevator(elevatorB);
```

### Make elevators move

To move the elevator, we need to use the building method called `callElevator`, where we can tell which is the floor that it is being called, and where is the destination of the trip. The building handles which is the best elevator to make the ride.

```javascript
building.callElevator(7, 10);
```

### Know where the elevators are

This method helps us to get where the elevators are.

```javascript
building.getElevatorsStatus();
```

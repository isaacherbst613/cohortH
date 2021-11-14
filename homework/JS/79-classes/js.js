(function(){
    'use strict';

    class Vehicle {
        constructor(make, model, year, color) {
            this.make = make;
            this.model = model;
            this.year = year;
            this.color = color;
        }
        go(speed) {
            this.speed = speed;
            console.log(`now driving at ${speed} mph`);

        }
        print() {
            console.log(`a ${this.year} ${this.make} ${this.model} in ${this.color} is traveling at ${this.speed}mph`);
        }
    }

    class Plane {
        constructor(make, model, year, color, passengers) {
            Vehicle.call(this, make, model, year, color);
            this.passengers = passengers;
        }
        go(speed) {
            this.speed = speed;
            console.log(`now Flying at ${speed}mph`);
        }
    }
    
    Plane.prototype = Object.create(Vehicle.prototype);
    

    const myPlane = new Plane('Boeing', '787', '2022', 'white', '500');

    const myVehicle = new Vehicle('Tesla', 'Model Y', '2021', 'white');
    myVehicle.go(50);
    myPlane.go(550);
    
    myVehicle.print();
    myPlane.print();

    console.log(myVehicle, myPlane);


}())
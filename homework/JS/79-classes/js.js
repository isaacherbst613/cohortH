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
            console.log(`a ${this.year} ${this.color} ${this.make} ${this.model} is traveling at ${this.speed}mph`);
        }
    }

    class Plane extends Vehicle {
        constructor(make, model, year, color, passengers) {
            super(make, model, year, color);
            this.passengers = passengers;
        }
        print() {
            console.log(`a ${this.year} ${this.color} ${this.make} ${this.model} is flying at ${this.speed}mph`);
        }
        go(speed) {
            this.speed = speed;
            console.log(`now Flying at ${speed}mph`);
        }
    }
    

    const myPlane = new Plane('Boeing', '787', '2022', 'white', '500');

    const myVehicle = new Vehicle('Tesla', 'Model Y', '2021', 'white');
    myVehicle.go(50);
    myPlane.go(550);
    
    myVehicle.print();
    myPlane.print();

    console.log(myVehicle, myPlane);


}())
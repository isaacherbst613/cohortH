(function(){
    'use strict';

    function Vehicle(make, model, year, color) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.color = color;
    }
    Vehicle.prototype.go = function(speed) {
        this.speed = speed;
        console.log(`now driving at ${speed} mph`);

    };
    Vehicle.prototype.print = function() {
        console.log(`a ${this.year} ${this.make} ${this.model} in ${this.color} is traveling at ${this.speed}mph`);
    };

    function Plane(make, model, year, color, passengers) {
        Vehicle.call(this, make, model, year, color);
        this.passengers = passengers;
    }
    
    Plane.prototype = Object.create(Vehicle.prototype);
    
    Plane.prototype.go = function(speed) {
        this.speed = speed;
        console.log(`now Flying at ${speed}mph`);
    };

    const myPlane = new Plane('Boeing', '787', '2022', 'white', '500');

    const myVehicle = new Vehicle('Tesla', 'Model Y', '2021', 'white');
    myVehicle.go(50);
    myPlane.go(550);
    
    myVehicle.print();
    myPlane.print();

    console.log(myVehicle, myPlane);


}())
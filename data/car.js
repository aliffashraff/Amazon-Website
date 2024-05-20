class Car {
  #brand;
  #model;
  speed = 0;
  isOpenTrunk = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    const trunkStatus = this.isOpenTrunk ? 'open' : 'closed';

    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`);
  }

  go() {
    if (!this.isOpenTrunk){
      this.speed += 5;
    }
    if (this.speed > 200) {
      this.speed = 200;
    }
  }

  brake() {
    this.speed -= 5;
    if (this.speed < 0) {
     this.speed = 0;
    }
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isOpenTrunk = true;
    }
  }

  closeTrunk() {
    this.isOpenTrunk = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor (carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk.');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk.');
  }
}

const car1 = new Car({
  brand:'Toyota',
  model: 'Corolla',
});
const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3',
});
const car3 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
})

console.log(car1);
console.log(car2);

car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

car1.openTrunk();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();

car2.openTrunk();
car2.go();
car1.displayInfo();

console.log(car3);
car3.go();
car3.go();
car3.go();
car3.displayInfo();
car3.openTrunk();
car3.displayInfo();
car3.brake();
car3.displayInfo();
car3.closeTrunk();

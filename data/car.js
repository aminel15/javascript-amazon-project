class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
    // this.speed = speed;
  }

  displayInfo() {
    return console.log(
      `brand: ${this.#brand}\nmodel: ${this.#model}\nspeed: ${this.speed}km/h\ntrunk is:${this.isTrunkOpen ? "open" : "close"} `,
    );
  }

  go() {
    if (this.isTrunkOpen) return;

    if (this.speed < 200) {
      this.speed += 5
      return this.displayInfo()
    };
  }

  brake() {
    if (this.speed > 0) {
      this.speed -= 5;
      return this.displayInfo()
    }
  }
  openTrunk() {
    if (this.speed > 0) return;
    if (this.speed === 0 && this.isTrunkOpen === false) {
      this.isTrunkOpen = true;
      return this.displayInfo();
    }
  }
  closeTrunk() {
    if (this.isTrunkOpen) {
      this.isTrunkOpen = false;
      return this.displayInfo();
    }
  }
}

class RaceCar extends Car {
  acceleration;
  
  constructor(brand, model, acceleration){
    super(brand , model);
    this.acceleration = acceleration
    this.brand= brand;
    this.model= model;
  }
  go(){
    let maxSpeed = this.speed + this.acceleration
    if (maxSpeed < 300) {
     this.speed += this.acceleration;
     return super.displayInfo()
    }
  }
  
  openTrunk() {
    return console.log(`This model '${this.model}' does not have a trunk!`)
  }
  closeTrunk() {
    return console.log(`This model '${this.model}' does not have a trunk!`)
  }
   displayInfo() {
    return console.log(
      `brand: ${this.brand}\nmodel: ${this.model}\nspeed: ${this.speed}km/h} `,
    );
  }
   brake() {
    if (this.speed > 0) {
      this.speed -= this.acceleration;
      return this.displayInfo()
    }
  }

}

let toyota = new Car("toyota", "crolla");
let tesla = new Car("tesla", "model 3");
let ferary = new RaceCar("ferary", "X400", 20)
// toyota.displayInfo()
// tesla.displayInfo()
// toyota.go();
// toyota.displayInfo();
// toyota.brake();
// toyota.displayInfo();
// toyota.go();
/* toyota.go();
toyota.go();
toyota.go();
toyota.go(); */
// toyota.displayInfo();
// toyota.brake();
// toyota.openTrunk();
// toyota.closeTrunk();
// toyota.go();
// toyota.displayInfo();
// ferary.go();
// ferary.displayInfo();
// ferary.brake();
// ferary.openTrunk;
// ferary.displayInfo();
//  ferary.brake()
//  ferary.brake()
//  ferary.brake()
//  ferary.openTrunk()

 // console.log(typeof toyota);

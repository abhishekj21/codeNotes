'use strict';
/*
// Constructor function and the new Operator
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};
const jonas = new Person('Jonas', 1991);
console.log(jonas);
const matilda = new Person('Matilda', 1993);
const jackson = new Person('Jack', 1999);
console.log(matilda, jackson);

const jay = 'Jay';

console.log(jonas instanceof Person);
console.log(jay instanceof Person);
///////////////////////////////////////////////////////////
//---------------------static method --------------------//

// see very carefully hey is not attached to prototype property of Person
// Here jonas in not able to access hey method because hey is not attached to prototype property of Person
// jonas.hey() it will not work
Person.hey = function () {
  console.log('Hey there 🖐');
  // here this keyword points to Person constructor because Person is a object
  // here this keyword is simply entire constructor function
  console.log(this);
};

// here Person is object
// and whatever  object  is calling a method will be a this keyword inside of that function => (hey())
// and simply the this keyword here is entire constructor function
Person.hey();
// jonas.hey();

///////////////////////////////////////////////////////////
//---------------------static method --------------------//
// Array.from() => here from() method attached to Array constructor directly so if you use from() method like this [1,2,3].from() it will not work because from() method not attached to prototype property of Array constructor so from() is a static method

// Number.parseFloat() is static method here Number is a constructor and parseFloat() is a method

// prototypes
// here we are setting manually calcAge() method to .prototype property of Person
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(matilda.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.hasOwnProperty('species'));
console.log(jonas.hasOwnProperty('firstName'));

console.log(jonas.__proto__);
console.log(Person.prototype);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

// here arr is object
// Array.prototype.map
// Here Array is a constructor function
// Prototype chain
const arr = [3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
console.log(arr.__proto__);
console.log(arr.__proto__.__proto__);
// Array.prototype.filter => it is because filter method live in Prototype property of the Array constructor

// creating our own method and adding in prototype of the Array constructor

Array.prototype.unique = function () {
  // and the this keyword is gone be an array on which unique method will be called
  return [...new Set(this)];
};
// and now output => [3, 4, 5 , 6, 7]  all element are unique
console.log(arr.unique());
// the function itself is also an object therefore it also have a prototype for eg:- bind() call() apply() this all are prototype that's why you are able to use this all with function because fun is also an object

////////////////////////////////////////////////////////
//---------------------------CLASS------------------//
// class expression
// although we have used class here behind the scene class are a function
// const PersonCl = class {};

// class declaration
class PersonCl {
  // constructor method
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //------------------ Instance method-------------------//

  //
  // it will automatically be added to the .prototype property of PersonCl so therefor all instances have access to it here instances means method that is created by using PersonCl class
  // objects are real but classes are blue print using classes we create objects
  // for example when someone want to build house he first created blue print of house or sketch of house after that using that sketch he created many house

  // here calcAge() method automatically get added to .prototype property of object i.e  PersonCl
  // so here we are not setting it manually
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  // setter and getter is useful for data validation
  get age() {
    return 2037 - this.birthYear;
  }
  // here set function and at top most code there constructor trying to set the same property value i.e fullName and it will give error so we write fullName like -> _fullName in set function
  // now fullName change into _fullName and this is also for constructor

  // set a property that already exits
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    // else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  //------------------ Instance method-------------------//

  //-------------------- Static method-------------------//
  static hey() {
    console.log('Hey');
    console.log(this);
  }
  //-------------------- Static method-------------------//
}

// whenever we create a new instance or object using new() keyword this constructor is automatically called
// when we create a new instance then constructor is called automatically and it will return a new object and that object is stored in jessica
const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);
// classes are not hoisted
// function declaration are hoisted it means we can use it before it is declared
// classes are first-class citizen and what that mean is we can pass them into function and also return them from function and that is because classes are just special kind of function behind the scene
// classes are executed in strict mode

// Every object in js have its own getter and setter property
// it will give error because walter is not full name
const walter = new PersonCl('walter', 1965);

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

////////////////////////////////////////////////////////
//---------------------------CLASS------------------//

// --------------------Object.create()-------------------//
// third way to apply delegation or prototypal inheritance is Object.create() here Object.create() is a function

// Now, with Object.create,there is still the idea of prototypal inheritance.However, there are no prototype properties involved.And also no constructor functions, and no new operator.So instead, we can use Object.create to essentially manually set the prototype of an object, to any other object that we want

const PersonProto = {
  // That's all the methods that we want the person objects to inherit.And so we put them in the prototype.

  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // here init is not constructor function because it is not called using new() operator
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// steven is a new object
// and in Object.create() we pass the object i.e PersonProto that we want to be the prototype of the new object

// And so this will now return a brand new object,that is linked to the prototype i.e PersonProto that we passed in here.

// So Steven here is right now an empty object.And it will be linked to this PersonProto object,which will be its prototype.
const steven = Object.create(PersonProto);
// it will output empty object {} but you will find calcAge() method in __proto__ of steven
console.log(steven);

// setting the property on the object
steven.name = 'steven';
steven.birthYear = 2002;

// steven is object PersonProto is prototype and calcAge() is method and we are able to access calcAge() to ho gya na prototypal inheritance

steven.calcAge();

// it will output true
// because steven ka __proto__ to PersonProto he h
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// coding challenge 1

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 10);
const mercedes = new Car('Mercedes', 40);
bmw.accelerate();
console.log(bmw);
mercedes.accelerate();
console.log(mercedes);

// Coding challenge 2

class Car1 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.speed} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.speed} is going at ${this.speed} km/h`);
  }

  get speedUs() {
    return this.speed / 1.6;
  }
  set speedUs(speed) {
    this.speed = speed + 1.6;
  }
}

const ford = new Car1('Ford', 120);
console.log(ford.speedUs);
ford.accelerate();
ford.accelerate();
ford.speedUs = 50;

// inheritance b/w classes

const Person1 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person1.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// Student is also a person so we want that object of Student can also be able to access method of Person1 class

// inheritance - child classes can inherit behaviour of parent class

// to link Person1.prototype with Student.prototype we use Object.create()
const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;

  // it will not work because we are calling constructor function like a regular function call in regular function call this keyword is set to undefined so property cannot be set to undefined and you will get error : cannot set property 'firstName' of undefined at Person
  // Person(firstName, birthYear);
  Person1.call(this, firstName, birthYear);
  this.course = course;
};

// now student.prototype Object is now an object that inherits from Person1.prototype
Student.prototype = Object.create(Person1.prototype);

Student.prototype.introduce = function () {
  console.log(`My name ${this.firstName} and I ${this.course}`);
};
const mike = new Student('Mike', 2020, 'CS');
console.log(mike);
mike.introduce();
mike.calcAge(); // mike.calcAge() only work because of code at line-no. 304
// when And so let's actually now go analyze what exactly happened here. And we already know that this worked because of the prototype chain,but let's see exactly how.So when we do mike dot calcAge,we are effectively doing a property or a method lookup.So that is JavaScript trying to find the requested property or method.Now, in this case, as we know,the calcAge method is of course not directly on the mike object. It's also not in mike's prototype.That's where we defined the introduced method,but not calcAge.Right?So just like before,whenever we try to access a method,that's not on the object's prototype,then JavaScript, will look up even further in the prototype chain and see if it can find a method so in the parent prototype.And that's exactly what happens here.So JavaScript will finally find the calcAge in person dot prototype,which is exactly where we defined it.And that's the whole reason

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// challenge 3
const Car2 = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car2.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car2.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car2.call(this, make, speed);
  this.charge = charge;
};

// link the prototype
EV.prototype = Object.create(Car2.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
console.log(tesla.__proto__.__proto__);
console.log(tesla.__proto__);
// through the prototype chain we are able to access brake() and accelerate()
tesla.brake();

// So when there are two methods or properties with the same name in a prototype chain, then the first one that appears in the chain is the one that's gonna be used.
// when there are two accelerate method

*/

// 221. Inheritance Between "Classes": ES6 Classes
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // i am going to override calcAge() method
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
  static hey() {
    console.log(`Hey there`);
  }
}

// extends keyword links prototype behind scene
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // First do this
    super(fullName, birthYear);
    // second do this
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // now this new method will override the first one calcAge() i.e in parent class
  // this new  calcAge()  method appear first in prototype chain that is responsible for overriding
  calcAge() {
    console.log(
      `I'm ${this.birthYear} years old but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('martha jonas', 2012, 'computer science');
console.log(martha);
martha.introduce();
martha.calcAge();

// inheritance b/w classes can actually be very problematic and dangerous in real world when we are designing software

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Object.create() => in this we don't even worry about constructors anymore,and also not about prototype properties,and not about the new operator.So it's really just objects linked to other objects.And it's all really simple and beautiful,

//Object.create() => All we are doing is simply linking objects together,where some objects then serve as the prototype of other objects.

// ES6 classes and constructor functions are actually way more used in the real world.But in any case, it's still super important and valuable
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
// and the PersonProto object is in turn the prototype of StudentProto. so therefore PersonProto is parent prototype of jay
const StudentProto = Object.create(PersonProto);
// so now the studentProto object that we created just earlier is now the prototype of jay object
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.intro = function () {
  console.log(`My name is ${this.firstName}`);
};
const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
console.log(typeof PersonProto === 'object' && PersonProto !== null);
jay.intro();
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ES6 classes

class Account {
  // Public fields
  locale = navigator.language;
  _movements = [];
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    // to make movements encapsulated we add _ in front of movements but it is not totaly encapsulated so we called it protected
    // protected property
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`${owner}`);
  }
  // Public interface
  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    // this.deposit(-val);
    this.movements.push(-val);
  }

  // here approveLoan() method should not be accessible from outside but it is and it is very dangerous
  // we need data encapsulation and data privacy
  // Protected
  _approveLoan(val) {
    return true;
  }

  // only the requestLoan() method should be accessible from outside
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// we still be able to access movements property outside but atlist our team will know that we should not access it outside of class
// acc1._movements.push(250);
// acc1._movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1);
// we are able to access pin outside of class but we should not
console.log(acc1.pin);

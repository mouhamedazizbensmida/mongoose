/** 1) Install & Set up mongoose */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

/** 2) Create a 'Person' Model */
var personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

/** 3) Create and Save a Person */
var Person = mongoose.model('Person', personSchema);

var createAndSavePerson = function(done) {
  var janeFonda = new Person({name: "May", age: 14, favoriteFoods: ["eggs", "milk", "lazania"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
  {name: "Aziz", age: 20, favoriteFoods: ["Humberger"]},
  {name: "Salma", age: 36, favoriteFoods: ["chicken","Pizza"]},
];
var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

/** 5) Use `Model.find()` */
var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

/** 6) Use `Model.findOne()` */
var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
/** 7) Use `Model.findById()` */
var findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
/** 8) Perform Classic Updates by Running Find, Edit, then Save */
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 

    person.favoriteFoods.push(foodToAdd);


    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};
/** 9) Perform New Updates on a Document Using model.findOneAndUpdate() */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};
/** 10)Delete One Document Using model.findByIdAndRemove*/
var removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};
/** 11)MongoDB and Mongoose - Delete Many Documents with model.remove()*/
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};
/** 12)Chain Search Query Helpers to Narrow Search Results
*/
const queryChain = (done) =>{const foodToSearch = "burito";
Person.find({favoriteFoods: foodToSearch}).sort("name").limit(2).select(["name","favoriteFoods"]).exec((err,data)=>{
  done(err,data);
})};
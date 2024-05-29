

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Save a Record of a Model
const Person = require('./models/person');

const createAndSavePerson = () => {
  const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Burger']
  });

  person.save().then(() => {
    console.log("save")
  });
};

createAndSavePerson();



//Many Records with model.create()
const Person = require('./models/person');

const arrayOfPeople = [
  { name: 'Alice', age: 25, favoriteFoods: ['Salad', 'Pasta'] },
  { name: 'Bob', age: 32, favoriteFoods: ['Steak', 'Fries'] },
  { name: 'Charlie', age: 28, favoriteFoods: ['Sushi', 'Ramen'] }
];

Person.create(arrayOfPeople, (err, people) => {
  if (err) return console.error(err);
  console.log(people);
});


// model.find()
Person.find({ name: { $exists: true } })
  .then((data) => console.log(data))
  .catch((err) => console.error("Une erreur est survenue => .", err));

//model.findOne()
const Person = require('./models/person');
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return console.error(err);
    console.log(person);
  });
};

findOneByFood();


//model.findById()
const findPersonById = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    console.log(person);
  });
};

findPersonById('60d2b7dce18b183b6c8d4e6e');

// Find, Edit, then Save
const updatePersonById = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    
    person.favoriteFoods.push('hamburger');
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log(updatedPerson);
    });
  });
};

updatePersonById('60d2b7dce18b183b6c8d4e6e');

//model.findOneAndUpdate()
const updatePersonByName = (personName) => {
    Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, (err, updatedPerson) => {
      if (err) return console.error(err);
      console.log(updatedPerson);
    });
  };
  
  updatePersonByName('Ali');

  //model.findByIdAndRemove
const PersonId = "6655d30d12bd9582495c4839";
Person.findOneAndDelete(PersonId)
.then((data) => console.log('Deleted' , data))
.catch((err) => console.error("erreur .", err));


// model.remove()
Person.deleteMany({name : 'Mary'})
.then((data) => console.log('Deleted' , data))
.catch((err) => console.error(" erreur .", err));


//chainSearchQuery.js
Person.find({ favoriteFoods: "burritos" })
  .sort("name")
  .limit(2)
  .select("-age")
  .exec()
  .then((d) => console.log(d))
  .catch((e) => console.error(e));
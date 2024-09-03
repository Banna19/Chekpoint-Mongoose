// Connexion avec Mongodb
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Création d'une instance de document
const Person = require('./person.js'); 

const newPerson = new Person({
  name: 'Alice',
  age: 30,
  favoriteFoods: ['Pizza', 'Pasta']
});

newPerson.save((err, data) => {
  if (err) return console.error(err);
  console.log('Person Saved:', data);
});

// Création de plusieurs personnes avec Model.create()
const person = require('./person.js'); 

const arrayOfPeople = [
  { name: 'John', age: 25, favoriteFoods: ['Burritos'] },
  { name: 'Mary', age: 22, favoriteFoods: ['Sushi'] },
  { name: 'Sam', age: 27, favoriteFoods: ['Tacos'] }
];

Person.create(arrayOfPeople, (err, docs) => {
  if (err) return console.error(err);
  console.log('People Created:', docs);
});

// Utiliser Model.find()
const person = require('./person.js'); 

Person.find({ name: 'John' }, (err, people) => {
  if (err) return console.error(err);
  console.log('People Found:', people);
});

// Model find.One()
const person = require('./person.js'); 

Person.findOne({ favoriteFoods: 'Pizza' }, (err, person) => {
  if (err) return console.error(err);
  console.log('Person Found:', person);
});

// Model.findById()
const person = require('./person.js'); 

const personId = 'id_exemple'; 

Person.findById(personId, (err, person) => {
  if (err) return console.error(err);
  console.log('Person Found by ID:', person);
});

// Effectuons des mises à jour
// Utilisons le model.findOneAndUpdate()
const person = require('./person.js'); 

const personName = 'John';

Person.findOneAndUpdate(
  { name: personName },
  { age: 20 },
  { new: true },
  (err, updatedPerson) => {
    if (err) return console.error(err);
    console.log('Updated Person:', updatedPerson);
  }
);

// Supprimer un document à l’aide de model.findByIdAndRemove
const Person = require('./person.js'); 

Person.findByIdAndRemove(personId, (err, removedPerson) => {
  if (err) return console.error(err);
  console.log('Removed Person:', removedPerson);
});

// Supprimer de nombreux documents avec model.remove()
const Person = require('./person.js'); 

Person.remove({ name: 'Mary' }, (err, result) => {
  if (err) return console.error(err);
  console.log('Removal Result:', result);
});

// Assistants de requête de recherche en chaîne pour affiner les résultats de recherche
const Person = require('./person.js'); 

Person.find({ favoriteFoods: 'Burritos' })
  .sort({ name: 1 })
  .limit(2)
  .select('-age') 
  .exec((err, people) => {
    if (err) return console.error(err);
    console.log('Filtered and Sorted People:', people);
  });

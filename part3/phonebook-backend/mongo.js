
const mongoose = require('mongoose')

async function executeTasks () {
    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
      })
      
      const Person = mongoose.model('Person', personSchema);
      
      if (process.argv.length === 3) {
          Person
              .find({})
              .then(persons => {
                console.log('phonebook:');
                persons.forEach(person => {
                    console.log(`${person.name} ${person.number}`)
                })
                mongoose.connection.close();
                process.exit(0);
              })

      } else {
        const person = new Person({
            name,
            number
        })
        
        person.save().then(result => {
          console.log(`added ${result.name} number ${result.number} to phonebook`)
          mongoose.connection.close()
        })
      }
}

async function connectToDB(url) {
    await mongoose.connect(url);
    executeTasks()
}

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://jesse-pantoja:${password}@cluster0.6moks99.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false)
connectToDB(url);

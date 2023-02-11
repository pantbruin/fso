require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./mongo');

const phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const app = express();
app.use(express.static('build'))
app.use(express.json());


morgan.token('req-data', (req, res) =>  JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-data'))

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find(person => person.id === id);

  if (!person){
    return res.status(404).end();
  }

  res.json(person);

})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error))
})

app.get('/api/persons', async (req, res) => {
    const phonebook = await Person.find({});
    res.status(200).json(phonebook);
  })

app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms :req-data'), async (req, res) => {

  const { name, number } = req.body;

  // Error handling
  if (name === undefined || number === undefined) return res.status(400).json({error: "must include name and number in request body"})
  // if(phonebook.find(element => element.name.toLowerCase() === name.toLowerCase())) return res.status(400).json({error: "name must be unique"})

  const newPerson = new Person({
    name,
    number
  });

  const result = await newPerson.save();
  res.json(result);
})

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(
        `<p>Phonebook has info for ${phonebook.length} people</p>
        <p>${date.toString()}<p>`
    )
})

app.put('/api/persons/:id', (req, res, next) => {
  const {name, number} = req.body;
  const id = req.params.id;

  const updateOptions = {
    new: true,
  }

  Person.findByIdAndUpdate(id, {name, number}, updateOptions)
    .then(dbdata => {
      res.status(200).json(dbdata)
    })
    .catch(error => next(error))


})

/* ERROR HANDLING MIDDLEWARE */
app.use((error, req, res, next) => {
  switch (error.name) {
    case 'CastError':
      res.status(400).json({'error': 'malformatted id in request'});
      break;
  
    default:
      res.status(500).json(error);
  }
  return;
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
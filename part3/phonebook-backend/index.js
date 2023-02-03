const PORT = 3001;
const express = require('express');
const morgan = require('morgan');

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

app.use(morgan('tiny'))
app.use(express.json());

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find(person => person.id === id);

  if (!person){
    return res.status(404).end();
  }

  res.json(person);

})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = phonebook.findIndex(person => person.id === id);

  if (index === -1) return res.status(404).end();

  phonebook.splice(index, 1);
  res.status(204).end();
})

app.get('/api/persons', (req, res) => {
    res.json(phonebook);
  })

app.post('/api/persons', (req, res) => {

  const { name, number } = req.body;

  // Error handling
  if (name === undefined || number === undefined) return res.status(400).json({error: "must include name and number in request body"})
  if(phonebook.find(element => element.name.toLowerCase() === name.toLowerCase())) return res.status(400).json({error: "name must be unique"})

  const id = phonebook.length > 0
    ? Math.max(...phonebook.map(n => n.id)) + 1
    : 0
  
  const newPerson = { id, name, number }

  phonebook.push(newPerson);
  res.json(newPerson);
})

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(
        `<p>Phonebook has info for ${phonebook.length} people</p>
        <p>${date.toString()}<p>`
    )
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
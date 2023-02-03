const PORT = 3001;
const express = require('express');


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
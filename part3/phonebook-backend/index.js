const PORT = 3001;
const express = require('express');


const notes = [
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

app.get('/api/notes', (req, res) => {
    res.json(notes);
  })

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(
        `<p>Phonebook has info for ${notes.length} people</p>
        <p>${date.toString()}<p>`
    )
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
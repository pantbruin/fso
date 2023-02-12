require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./mongo');

const app = express();
app.use(express.static('build'))
app.use(express.json());


morgan.token('req-data', (req, res) =>  JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-data'))

app.get('/api/persons/:id', (req, res) => {

  Person.findById(req.params.id)
    .then(result => {
      console.log(result);
      if (!result) {
        return res.status(404).end();
      }
      res.status(200).json(result);
    })
    .catch(error => next(error));

})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
    Person.find({})
      .then(result => res.status(200).json(result))
      .catch(error => next(error))
  })

app.post('/api/persons', async (req, res, next) => {

  const { name, number } = req.body;

  const foundMatchingName = await Person.findOne({name});
  if (foundMatchingName) return res.status(400).json({error: 'Name already exists in DB'})

  const newPerson = new Person({
    name,
    number
  });

  newPerson
    .save()
    .then(saveResult => res.status(201).json(saveResult))
    .catch(error => next(error));
});

app.get('/info', (req, res, next) => {

    Person.countDocuments({})
      .then(nDocuments => {
        const date = new Date();
        res.send(
          `<p>Phonebook has info for ${nDocuments} people</p>
          <p>${date.toString()}<p>`
      )
      })
      .catch(error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
  const {name, number} = req.body;
  const id = req.params.id;

  const updateOptions = {
    new: true,
    runValidators: true,
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
    
    case 'ValidationError':
      res.status(400).json({error: error.message});
      break;
  
    default:
      res.status(500).json({error: error.message});
  }
  return;
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
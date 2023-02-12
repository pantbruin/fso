
const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

// Connect to DB
mongoose.set('strictQuery',false)
mongoose.set('bufferTimeoutMS', 60000);
mongoose.connect(url).then(() => console.log('Connected to db')).catch(console.log);

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(val) {
                return /[0-9]{3}[-][0-9]{3}[-][0-9]{4}/.test(val);
              },
              message: props => `${props.value} is not a valid phone number! Must be in the form`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  });


module.exports = mongoose.model('Person', personSchema);





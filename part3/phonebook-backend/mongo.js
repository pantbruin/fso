
const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

// Connect to DB
mongoose.set('strictQuery',false)
mongoose.set('bufferTimeoutMS', 60000);
mongoose.connect(url).then(() => console.log('Connected to db')).catch(console.log);


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

module.exports = mongoose.model('Person', personSchema);





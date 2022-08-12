const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erroe in connecting to database'));

db.once('open', function(){
    console.log('Successfully connected to database');
})
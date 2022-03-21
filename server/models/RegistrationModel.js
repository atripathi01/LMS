const mongoose = require('mongoose');

var registrationSchema = new mongoose.Schema({
   
	name : {type: String},
	email : {type: String, unique: true},
	password : {type: String},
	registrationDate : {type: Date},
	role : {type: String},
	courseAccess : [{type: String}]
});

mongoose.model('Registration', registrationSchema); 
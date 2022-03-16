const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
   
	name : {type: String},
	email : {type: String, unique: true},
	password : {type: String},
	registrationDate : {type: Date},
	role : {type: String}

});


const Admin = new mongoose.model('Admin', adminSchema);
Admin.count({}, (err, count) => {
    if(count == '0') {
        const AdminList = new Admin({
            name: 'Admin',
            email: 'nik@abc.in',
            password: 'nikita123',
			registrationDate: new Date(Date.now()),
			role: 'Admin'
        });
        AdminList.save();
    }
});

mongoose.model('Admin', adminSchema); 

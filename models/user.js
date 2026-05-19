const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator'); //Lié à npm install --save mongoose-unique-validator
//évite d'avoirs plusieurs user avec la même ad.mail

const userSchema = new mongoose.Schema({
email:{type: String, required: true, unique: true},
password:{type: String, required: true, unique: true}
});

userSchema.plugin(uniqueValidator.default || uniqueValidator);

module.exports = mongoose.model('user',userSchema);







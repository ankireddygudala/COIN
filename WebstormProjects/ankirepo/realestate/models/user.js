const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('./../config/config');

const Schema = mongoose.Schema;


SALT_WORK_FACTOR = 10;



// defining user scheema
const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required:true,
        minlength:1,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    firstName:{
        type: String,
        required: true,
        minlength:2
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type:String,
        minlength:6,
        required: true
    },
    address: {
        city:{ type: String },
        street: { type: String },
        houseNumber: { type:String },
        country:{type:String},
        pincode:{type:Number, minlength:6},
        state:{type: String}
    },
    admin: {
        type: Boolean
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    tokens:{
        access:{
            type: String
        },
        token:{
            type: String
        }
    }
});

// meethod to execute before saving each user into the database
// on every save, add the date
UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    if(user.password.length > 50 ) return next();
    console.log("calling pre save method...");

    //generating salt and encrypt password
    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    var hash = bcrypt.hashSync(user.password, salt);
    this.password = hash;
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    this.admin = false;
    next();
});

//method to update time when user details updated
UserSchema.pre('update', function(next){
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
});
//schema method to compare passwords
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// method to update new password
UserSchema.methods.updatePassword = function(newPassword, callback) {
    var user = this;
    console.log("user:", user);
    console.log("Old:", user.password);

    //generating salt and encrypt password
    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    var hash = bcrypt.hashSync(newPassword, salt);
    user.password = hash;
    // change the updated_at field to current date
    user.updated_at = new Date();

    // Model.update(query, { $set: { name: 'jason bourne' }}, options, callback)
    user.save((err)=>{
        console.log("update function...");
    if(err){
        console.log(err);
        callback(err)
    }
    callback(null, true);
})
}

//method to generate authentication token to user
UserSchema.methods.generateAuthToken = function(callback){
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id:user._id.toHexString(), access}, config.secrete).toString();
    user.tokens = {
        access, token
    }
    // change the updated_at field to current date
    user.updated_at = new Date();
    user.save((err, res)=>{
        if(err){
            callback(err);
        }
        callback(null, token);
})
}
module.exports = mongoose.model('User',UserSchema);
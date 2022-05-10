const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email']
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            default: '',
            required: true,
        },
        profileImage: {
            type: String,
            required: true,
            default: ''
        }
    }
);

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const User = mongoose.model('user', UserSchema);

module.exports = User;
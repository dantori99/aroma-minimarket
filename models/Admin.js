const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const uniqueValidator = require('mongoose-unique-validator');

const AdminSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

AdminSchema.plugin(uniqueValidator);
AdminSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Admin = mongoose.model('admin', AdminSchema);

module.exports = Admin;
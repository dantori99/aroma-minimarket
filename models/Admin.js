const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const AdminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        }
    }
);

AdminSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Admin = mongoose.model('admin', AdminSchema);

module.exports = Admin;
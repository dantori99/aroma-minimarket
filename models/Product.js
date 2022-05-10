const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: 'string',
            lowercase: true,
            required: true
        },
        price: {
            type: 'string',
            required: true
        },
        quantity: {
            type: 'number',
            required: true
        }
    }
)

ProductSchema.plugin(uniqueValidator);
ProductSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
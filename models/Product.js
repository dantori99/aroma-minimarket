const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const uniqueValidator = require('mongoose-unique-validator');

const ProductSchema = new mongoose.Schema(
    {
        namaProduk: {
            type: String,
            lowercase: true,
            required: true
        },
        harga: {
            type: String,
            required: true
        },
        kuantitas: {
            type: Number,
            required: true
        },
        tanggalMasuk: {
            type: Date,
            default: Date.now,
            required: true
        }
    }
)

ProductSchema.plugin(uniqueValidator);
ProductSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
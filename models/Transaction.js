const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const uniqueValidator = require('mongoose-unique-validator');

const TransactionSchema = new mongoose.Schema(
    {
        adminCode: {
            type: 'string',
            required: true
        },
        barang: {
            type: 'string',
            required: true
        },
        total: {
            type: 'string',
            required: true
        },
        status: {
            type: 'string',
            default: 'Menunggu Pembayaran!',
            required: true
        }
    },
    {
        timestamps: {
            updatedAt: {
                type: 'date',
                default: Date.now,
                required: true
            }
        }
    }
);

TransactionSchema.plugin(uniqueValidator)
TransactionSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

const Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;
const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "account",
        required : [true,"Transaction must be assocaited with a from account"],
        index: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "account",
        required : [true,"Transaction must be assocaited with a to account"],
        index: true
    },
    status : {
        type : String,
        enum : {
            values : ["PENDING","FAILED","COMPLETED","REVERSED"],
            message : "Status can either be PENDING,FAILED,COMPLETED or REVERSED"
        },
        default : "PENDING"
    },
    amount :{
        type : Number,
        required : [true,"amount is required for tramsaction"],
        min : [0,"Transaction amount cannot be negative"]
    },
    idempotencyKey : {
        type : String,
        required : true,
        index : true,
        unique : true
    }
},
{
    timestamps : true
})

const transactionModel = mongoose.model("transaction",transactionSchema);

module.exports = transactionModel;
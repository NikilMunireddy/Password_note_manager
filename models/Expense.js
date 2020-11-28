const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
title:{
    type: String,
    required: true
},
amount:{
    type: String,
    required: true
},
date:{
    type: Date,
    default: Date.now
}
})

module.exports= Note= mongoose.model("expense", ExpenseSchema)
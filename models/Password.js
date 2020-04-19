const mongoose = require('mongoose')

const PasswordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
    title:{
        type: String,
        required: true
    },
    accountId:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});



module.exports= User= mongoose.model("password", PasswordSchema)
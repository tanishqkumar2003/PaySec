const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tanishq:admin@cluster0.p4vtfdh.mongodb.net/paytm');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase:true,
        minLength: 3,
        maxLength: 30 
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}
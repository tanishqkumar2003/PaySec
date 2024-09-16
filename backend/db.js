const mongoose = require('mongoose');

const connectToMongo = async() =>{
    try{
        await mongoose.connect('mongodb+srv://tanishq:admin@cluster0.p4vtfdh.mongodb.net/paytm');
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.log("Error connecting to MongoDB", error.message);
        
    }
};


const userSchema = new mongoose.Schema({
    userName: {
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
        type: true,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: true,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}
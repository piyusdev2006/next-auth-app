import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema({
    username: {
        type: String,
        required: [ true, 'Username is required' ],
        unique: true
    },
    email: {
        type: String,
        required: [ true, 'Email is required' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ]
    },
    // common fields
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }, 

    // tokens are part of the user model to handle authentication and authorization
    forgotPasswordToken: {
        type: String,
    },

    forgotPasswordTokenExpiry: {
        type: Date,
    }, 

    verifyToken: {
        type: String,
    },
    
    verifyTokenExpiry: {
        type: Date,
    }
});  

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

// mongoose.models.User : we do this because everytime db call is made, the model is reloaded in the memory and 
// if we don't store the model in the variable, it will create a new model every time, which will cause errors
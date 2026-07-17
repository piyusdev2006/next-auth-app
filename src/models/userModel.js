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
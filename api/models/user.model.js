import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,     
    },
    email:{
        type: String,
        required: true, 
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: 'https://www.pngmart.com/files/23/Profile-PNG-Photo.png',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
    
 }, {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;
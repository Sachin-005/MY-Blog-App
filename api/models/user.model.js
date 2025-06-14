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
        default: 'https://in.images.search.yahoo.com/images/view;_ylt=Awrx.HiAIE1oqfwDfUq9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzg1ZTM4YWIyNmI4M2Q1ZGRlNDVkNzk4NTVhZWZkMTFlBGdwb3MDMTQEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dprofile%2Bimage%26type%3DE210IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D14&w=2048&h=2048&imgurl=www.pngmart.com%2Ffiles%2F23%2FProfile-PNG-Photo.png&rurl=https%3A%2F%2Fwww.pngmart.com%2Fimage%2F764538&size=105KB&p=profile+image&oid=85e38ab26b83d5dde45d79855aefd11e&fr2=piv-web&fr=mcafee&tt=Profile%2C+Concept%2C+Visual%2C+Creative%2C+Identity+PNG&b=0&ni=21&no=14&ts=&tab=organic&sigr=ydZNhOP4W._5&sigb=4B9aU.1g9VgP&sigi=3uBFBopbNIJJ&sigt=zMJyC8EY.E38&.crumb=5rfXiRNY8n2&fr=mcafee&fr2=piv-web&type=E210IN826G0',
    },
    
 }, {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;
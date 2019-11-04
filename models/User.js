const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = {
    googleID: String
};

mongoose.model('users', userSchema);
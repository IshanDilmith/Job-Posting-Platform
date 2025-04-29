const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin',
    },
}, { timestamps: true });

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity().required()
    });

    return schema.validate(data);
}

const User = mongoose.model('User', userSchema);
module.exports = {User, validate};


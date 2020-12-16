import mongoose from 'mongoose';
const gameSchema = mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    email: String,
    city: String,
    phoneNo: Number,
    birthday: Date,
    password: Password,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    joinCount: {
        type: Number,
        id: [Number],
        default: 0
    },

    firstName: String,
    firstName: String,
    firstName: String,



});
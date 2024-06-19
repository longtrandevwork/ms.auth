import mongoose from 'mongoose';
import { USER_COLLECTION } from '../constants/user.js';

const Schema = mongoose.Schema;

export const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        language: { type: String, required: true },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 225
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
    },
);

export const UserModel = mongoose.model('UserModel', UserSchema, USER_COLLECTION);



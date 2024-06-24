import { UserModel } from '../model/user.js';
import { loginValidator, registerValidator } from '../validator/auth.js';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';

const login = async (request, respond) => {
    const { email, password } = request.body;

    loginValidator({ email, password });

    const user = await UserModel.findOne({ email });

    if (!user) {
        return respond.status(400).json({
            message: 'Invalid email or password',
        });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return respond.status(400).json({
            message: 'Invalid email or password',
        });
    }

    const token = Jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);

    respond.status(200).json({
        message: 'Login successful',
        token,
    });

}

const register = async (request, respond) => {
    const { name, email, password, language } = request.body;

    registerValidator({ name, email, password, language });

    const isEmailExist = await UserModel.findOne({ email });

    if (isEmailExist) {
        return respond.status(400).json({
            message: 'Email already exist',
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(request.body.password, salt);
    const user = await UserModel.create({
        name,
        email,
        password: hashPassword,
        language,
    });

    console.log(user);

    respond.status(200).json({
        message: 'User created successfully',
    });
}

const getUser = async (request, respond) => {
    const userId = request.params.id;
    const user = await UserModel.findOne({ _id: userId }).lean();

    if (!user) {
        return respond.status(400).json({
            message: 'User not found',
        });
    }

    respond.status(200).json(user);
}

export const authController = (app) => {
    app.post('/auth/login', login)
    app.post('/auth/register', register)
    app.get('/auth/user/:id', getUser)
} 
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

dotenv.config();

const mailVerify = async (email) => {
    try {
        const jwtsecret = process.env.JWT_SECRET_MAIL || 'default_secret';
        const token = jwt.sign({ email }, jwtsecret, { expiresIn: '1h' });

        const verificationUrl = `http://localhost:3000/api/auth/verifyemail?token=${token}`;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: `"Map Me" <${process.env.EMAIL_ADDRESS}>`,
            to: email,
            subject: 'Email Verification for Map Me',
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email for Map Me.</p>`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending verification email');
    }
};

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        
        await mailVerify(email);
        res.status(403).json({ message: 'User registered successfully. Please check your email for the verification link.' });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        if (!user.isVerified) {
            await mailVerify(user.email);
            return res.status(403).json({ message: 'Email not verified. Please verify your email.' });
        }

        const jwtsecret = process.env.JWT_SECRET || 'default_secret';
        const token = jwt.sign({ id: user._id, email: user.email }, jwtsecret, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        next(error);
    }
};

export const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;
        const jwtsecret = process.env.JWT_SECRET_MAIL || 'default_secret';
        const decoded = jwt.verify(token, jwtsecret);
        const email = decoded.email;

        const user = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.redirect("http://localhost:5173/login");
    } catch (error) {
        next(error);
    }
};



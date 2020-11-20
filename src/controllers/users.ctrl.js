import User from '../models/user'; 
import jwt from 'jsonwebtoken';

class UsersController {

    async signup(req, res) {

        const { username, email, password } = req.body;

        const newUser = new User({username, email, password});
        const user = await User.findOne({email: email});
        if(user === null) {
            newUser.password = await newUser.encryptPassword(newUser.password);
            const userSaved = await newUser.save();
            res.status(201).json({
                message: 'registered.',
                user: userSaved
            });
        } else{
            res.status(400).json({error: 'the email is already in use.'});
        }
        
    }

    async signin(req, res) {
        const user = await User.findOne({email: req.body.email});
        if(user === null) {
            res.status(400).json({error: 'auth failed, email not found.'});
        } else {
            const isCorrectPass = await user.validatePassword(req.body.password, user.password);
            if(!isCorrectPass) {
                res.status(400).json({error: 'invalid password.'});
            } else {
                const token = jwt.sign({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                }, process.env.SECRET, {expiresIn: 600});
                const query = {email: user.email};
                await User.findOneAndUpdate(query, {token: token});
                res.header('authorization', token).json({
                    message: 'is authenticated.'
                });
            }
        }
    }

    async logout(req, res) {
        const token = req.header('authorization');
        const query = {token: token};
        const user = await User.findOne(query);
        if(user === null) {
            res.status(400).json({error: 'invalid token.'});
        } else {
            await User.updateOne(query, {$unset: {token: 1}});
            res.json({message: 'is logged out.'});
        }
    }

}

export const usersCtrl = new UsersController();
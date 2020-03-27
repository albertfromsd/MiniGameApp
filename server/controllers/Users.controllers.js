const { User } = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    register(req, res) {
        User.create(req.body)
        .then((newUser) => {
                
            const token = jwt.sign({
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email
            }, process.env.SECRET_KEY);
    
            res.cookie('token', token, {
                httpOnly: true
            })
            res.json({status:"Success", token});
        })
        .catch(err => res.status(400).json(err));
    },

    async login(req, res) {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });
        if(user == null) {
            console.log("Users.controller user does not exist");
            return res.sendStatus(400);
        };

        const result = await bcrypt.compare(password, user.password);
        if(result == false) {
            console.log("Users.controller password does not match");
            return res.sendStatus(400);
        };

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            userName: user.userName 
        }, process.env.SECRET_KEY);

        res.cookie('token', token,{
            httpOnly: true
        });
        res.json({ status: "Successfully logged in", token });
        console.log("End of serverUserController: "+res.json.status);
    },

    logout(_, res) {
        res.clearCookie('token');
        res.json({ status: "Successfully logged out"})
    },

    getAllUsers(_, res) {
        User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.json(err));
    },

    getUserById(req, res) {
        User.findOne({_id: req.params.id})
        .then(user => res.json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email
        }))
        .catch(err => res.json(err));
    },

    getUserByUserName(req, res) {
        User.findOne({userName: req.params.username})
        .then(user => res.json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email
        }))
        .catch(err => res.json(err));
    },

    getUserByEmail(req, res) {
        User.findOne({email: req.params.email})
        .then(user => res.json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email
        }))
        .catch(err => res.json(err));
    }

};


const { GameRoom } = require('../models/GameRoom.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    createRoom(req, res) {
        GameRoom.create(req.body)
        .then( (newRoom) => {
                
            const token = jwt.sign({
                id: newRoom._id,
                roomName: newRoom.roomName,
            }, process.env.SECRET_KEY);
    
            res.cookie('token', token, {
                httpOnly: true
            })

            res.json({status:"Success", token});

            // add creator id as host
            // also add to list of players in room
        })
        .catch(err => res.status(400).json(err));
    },

    async enterRoom(req, res) {
        const { roomName, password } = req.body;

        const room = await GameRoom.findOne({ roomName });
        if(room == null) {
            console.log("GameRoom.controller room does not exist");
            return res.sendStatus(400);
        };

        const result = await bcrypt.compare(password, room.password);
        if(result == false) {
            console.log("GameRoom.controller password does not match");
            return res.sendStatus(400);
        };

        const token = jwt.sign({
            roomId: room._id,
            email: room.email,
            roomName: room.roomName 
        }, process.env.SECRET_KEY);

        res.cookie('token', token,{
            httpOnly: true
        });
        res.json({ status: "Successfully logged in", token });

        // add the player to the room list
        console.log("End of serverGameRoomController: "+res.json.status);

    },

    // get list of active users inside a single room
    getMembersByRoomName(req, res) {
        GameRoom.find({roomName: req.body})
        .then( room => res.json(room) )
        .catch( console.log )
    },

    logout(_, res) {
        res.clearCookie('token');
        res.json({ status: "Successfully logged out"})
    },


}
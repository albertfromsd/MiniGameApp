const GRCtrl = require('../controllers/GameRoom.controller');

const { authenticate } = require('../config/jwt.config');

module.exports = app => {

    app.post('/api/gameroom/:roomName', GRCtrl.createRoom);
    app.get('/api/gameroom/:roomName', GRCtrl.enterRoom);

    app.get('/api/gameroom/:roomName/playerList', GRCtrl.getMembersByRoomName);

    app.delete('/api/gameroom/:roomName/delete', GRCtrl.logout);

}
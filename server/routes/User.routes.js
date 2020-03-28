const UCtrl = require('../controllers/User.controller');

const { authenticate } = require('../config/jwt.config');

module.exports = app => {

    app.post('/api/user/register', UCtrl.register);
    app.post('/api/user/login', UCtrl.login);

    app.get('/api/allusers', authenticate, UCtrl.getAllUsers);
    app.get('/api/user/id/:id', UCtrl.getUserById);
    app.get('/api/user/username/:username', UCtrl.getUserByUserName);
    app.get('/api/user/email/:email', UCtrl.getUserByEmail);
    
    app.delete('/api/user/logout', UCtrl.logout);
}
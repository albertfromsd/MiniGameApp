const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/gameroom", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(() => console.log("[GameroomApp] Established a connection to the database"))
    .catch(err => console.log("[ERROR: mongoose.config] Could not connect to the database Gameroom", err));

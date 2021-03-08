// En Node importamos
require('dotenv').config();
const express = require('express');
const app = express();

//CONEXION CON MONGODB
const {env: {PORT, MONGODB_URL}} = process;

const mongoose = require('mongoose');
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true
})

.catch((error) => {
    console.log(error);

    if(mongoose.connection.readyState === 1);
        return mongoose.disconnect()
        .catch(console.error)
        .then(() => process.exit())
});

    const authRouter = require('./routes/authRouter');
    const userRouter = require('./routes/userRouter');
    const commentRouter = require('./routes/commentRouter');
    const lostRouter = require('./routes/lostRouter');
    const foundRouter = require('./routes/foundRouter');
    
//Middlewares to parse body
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(authRouter);
    app.use(userRouter);
    app.use(commentRouter);
    app.use(lostRouter);
    app.use(foundRouter);
    
    app.use('*', (req, res) => {
        res.status(404).send("Recurso no encontrado")
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
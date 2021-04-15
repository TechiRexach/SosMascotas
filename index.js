// En Node importamos
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');


//CONEXION CON MONGODB
const {env: {PORT, MONGODB_URL}} = process;

// handle file upload MULTER
app.use('*/storage', express.static("storage"));

const mongoose = require('mongoose');
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true
})
.then(() => {
    console.log("DB connected")
})

.catch((error) => {
    console.log(error);

    // if(mongoose.connection.readyState === 1);
    //     return mongoose.disconnect()
    //     .catch(console.error)
    //     .then(() => process.exit())
});

    const authRouter = require('./routes/authRouter');
    const userRouter = require('./routes/userRouter');
    const commentRouter = require('./routes/commentRouter');
    const animalRouter = require('./routes/animalRouter');

//Middlewares to parse body
  
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use('/auth', authRouter);
    app.use('/users', userRouter);

    // checkToken
    app.use(commentRouter);
    app.use(animalRouter);

    app.use('*', (req, res) => {
        res.status(404).send("<h1>Revisa la URL 🥲</h1>")
    });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
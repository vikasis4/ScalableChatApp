const express = require('express');
const cors = require('cors');

const app = express();

const Auth_router = require('./routes/auth')
const Room_router = require('./routes/room')
const Message_router = require('./routes/messages')

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', Auth_router)
app.use('/room', Room_router)
app.use('/message', Message_router)

app.listen(8001, () => {
    console.log('Api_Server is listening at PORT 8001');
})
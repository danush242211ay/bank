const express = require('express');
const cookieparser = require('cookie-parser')




const app = express();
app.use(express.json());
app.use(cookieparser());

const authRouter = require('./routes/auth.routes')
const accountRouter= require('./routes/account.routes')

app.use('/api/auth', authRouter)
app.use('/api/accounts',accountRouter)

module.exports = app;
const express = require('express');
const cookieparser = require('cookie-parser')

/* middlewares */
const app = express();
app.use(express.json());
app.use(cookieparser());

/* import the routers */
const authRouter = require('./routes/auth.routes')
const accountRouter= require('./routes/account.routes')

/* routers use */
app.use('/api/auth', authRouter)
app.use('/api/accounts',accountRouter)

module.exports = app;
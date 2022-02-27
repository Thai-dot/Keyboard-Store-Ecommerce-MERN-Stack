require('dotenv').config()
const express = require('express')
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require('./database/database');
const port = process.env.PORT || 3000

//import routes//
const authRouter= require("./route/auth")
const keyboardRouter= require("./route/keyboard")
const customerRouter= require("./route/customer")
const paymentRouter= require("./route/payment")

connectDB();

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors());



app.use('/api/auth', authRouter)
app.use('/api/keyboard', keyboardRouter)
app.use("/api/customer", customerRouter);
app.use("/api/payment", paymentRouter);


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
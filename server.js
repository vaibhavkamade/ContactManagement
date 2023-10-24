const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

//establishing connection with the database
connectDb();

const app = express();
const port =  5000;

app.use(express.json());
app.use("/api/contacts",require('./routes/contactRoutes.js')) //adding middleware for routing
app.use("/api/users",require('./routes/userRoutes.js'))
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})












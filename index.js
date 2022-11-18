const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express()

app.use(express.json());
dotenv.config();
const PORT = process.env.PORT

mongoose.connect(
    process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },() => {
        console.log("mongodb is connected");
    }
);

app.listen(PORT, () => {
    console.log("server is up and running");
})
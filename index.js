const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const router = require('./src/routes/user.route')

app.use(express.json());
app.use(cors());
dotenv.config();
const PORT = process.env.PORT
app.use(router);

try {
    mongoose.connect(process.env.DB_URL);
} catch (error) {
    console.log(article)
}

app.listen(PORT, () => {
    console.log("server is up and running");
})
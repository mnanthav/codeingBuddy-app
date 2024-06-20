//================================================================
// server/index.js
//================================================================
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './server/config.env' }); // import config.env file
const db = process.env.DATABASE_URL;
const options = {
    connectTimeoutMS: 30000
}

const langRoutes = require('./routes/languages.js');

const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
   .connect(db, options) // connect to database
   .then(() => { // if successful connection
        console.log('Database Connected');
    })
    .catch((error) => { // else, connection failed
        console.log(`Cannot connect to database, ${error}`)
    });

// Have Node serve files for built react app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// starter endpoint
app.get("/", (req, res) => {
    res.json({ 
        message: "Welcome to Code(ing) Buddy Server!"
    });
});

// ------------ routes --------------------------------
// language routes
app.use("/language", langRoutes);

// syntax_construct routes
// library_framework routes
// ------------ end of routes -------------------------

// All other GET requests not handled before will return React app
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// start server 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
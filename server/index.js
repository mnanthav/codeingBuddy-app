// server/index.js
//================================================================
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 8888;

const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://mnanthav:VxAk06AtXgVWVfxL@codeingbuddy.0ek911o.mongodb.net/?retryWrites=true&w=majority&appName=codeingbuddy";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    const collection = client.db("test").collection("devices");

    // perform actions on the collection ovject 
    console.log("Connected successfully to server");
    client.close();
})
// Have Node serve files for built react app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// starter endpoint
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to Code(ing) Buddy Server!"});
});

// All other GET requests not handled before will return React app
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// start server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});
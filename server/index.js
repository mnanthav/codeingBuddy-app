// server/index.js
//================================================================

const express = require('express');

const PORT = process.env.PORT || 8888;

const app = express();

// starter endpoint
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to Code(ing) Buddy Server!"});
});
// start server
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});
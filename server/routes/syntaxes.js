//================================================================
// server/routes/syntaxes.js
//----------------------------------------------------------------
// Description: CRUD operations for syntax collection
//================================================================
const express = require('express');
const Syntax = require('../models/Syntax');
const { default: mongoose } = require('mongoose');

const router = express.Router();

// Endpoint: "http://localhost:8888/syntax/"
router.post('/', async (req, res) => {
    // POST a syntax

    try {
        // Validate language, construct, and category in request body
        if (!req.body.language || !req.body.construct || !req.body.category) {
            return res.status(400).json({
                message: 'Language, construct, and category are required fields'
            });
        }

        let syntax = new Syntax({
            language: req.body.language,
            name: req.body.name,
            construct: req.body.construct,
            category: req.body.category,
            description: req.body.description,
            examples: req.body.examples || [],
            sources: (req.body.sources || []).map(src => ({
                name: src.name,
                url: src.url,
                description: src.description
            }))
        });

        syntax = await syntax.save(); // Save syntax data to db

        res.status(201).json({
            message: 'Syntax created successfully',
            data: syntax
        });
    }
    catch (err) {
        console.error("Error creating syntax: ", err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation Error',
                error: err.message
            });
        } else {
            res.status(500).json({
                message: 'Failed to create syntax',
                error: err.message
            });
        }
    }
});

// Endpoint: "http://localhost:8888/syntax/"
router.get('/', async (req, res) => {
    // GET all syntaxes

    try {
        const { language, name, construct, category } = req.query;
        let query = {}; 
        if (language) query.language = language;
        if (name) query.name = new RegExp(name, 'i'); // search by name (case insensitive)
        if (construct) query.construct = new RegExp(construct, 'i'); // search by construct (case insensitive)
        if (category) query.category = new RegExp(category, 'i'); // search by category (case insensitive)

        const projection = 'language, name, construct, category, description, examples, description'

        let syntaxes = await Syntax.find(query).select(projection);

        res.status(200).json({
            message: 'Syntaxes fetched successfully',
            data: syntaxes
        });
    }
    catch (err) {
        console.error("Error fetching syntaxes: ", err);

        res.status(500).json({
            message: 'Failed to fetch syntaxes',
            error: err.message
        });
    }
});

// Endpoint: "http://localhost:8888/syntax/:id"
router.get('/:id', async (req, res) => {
    // GET a syntax by id

    const id = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }

    try {
        let syntax = await Syntax.findById(id);

        if (!syntax) {
            return res.status(404).json({
                message: 'Syntax not found'
            });
        }

        res.status(200).json({
            message: 'Syntax fetched successfully',
            data: syntax
        });
    }
    catch (err) {
        console.error("Error fetching syntax: ", err);

        res.status(500).json({
            message: 'Failed to fetch syntax',
            error: err.message
        });
    }
});

// Endpoint: "http://localhost:8888/syntax/:id"
router.patch('/:id', async (req, res) => {
    // Update a syntax

    const id = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }

    const updatedSyntax = req.body;

    // Check if body is empty
    if (Object.keys(updatedSyntax).length === 0) {
        return res.status(400).json({
            message: 'No update data provided'
        });
    }

    // Ensure validators run
    const options = { new: true, runValidators: true, useFindAndModify: false }; 

    try {  
        let syntax = await Syntax.findByIdAndUpdate(
            id, updatedSyntax, options
        );

        if (!syntax) {
            return res.status(404).json({
                message: 'Syntax not found'
            });
        }

        res.status(200).json({
            message: 'Syntax updated successfully',
            data: syntax
        });
    }
    catch (err) {
        console.error("Error updating syntax: ", err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation Error',
                error: err.message
            });
        } else {
            res.status(500).json({
                message: 'Failed to update syntax',
                error: err.message
            });
        }
    }
});

// Endpoint: "http://localhost:8888/syntax/:id"
 router.delete('/:id', async (req, res) => {
    // Delete a syntax

    const id = req.params.id;

    // Check ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }

    try {
        let syntax = await Syntax.findByIdAndDelete(id);

        if (!syntax) {
            return res.status(404).json({
                message: 'Syntax not found, not deleted'
            });
        }

        res.status(200).json({
            message: `Syntax ${syntax.name} of ${syntax.language} has been deleted successfully.`,
            data: syntax
        });
    }
    catch (err) {
        console.error("Error deleting syntax: ", err);

        res.status(500).json({
            message: 'Failed to delete syntax',
            error: err.message
        });
    }
});

module.exports = router;
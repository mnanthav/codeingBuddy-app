//================================================================
// server/routes/languages.js
//----------------------------------------------------------------
// Description: CRUD operations for language collection
//================================================================
const express = require('express');
const Language = require('../models/Language');

const router = express.Router();

// Actual endpoint will be "http://localhost:8888/language"
router.post('/', async (req, res) => { // async returning Promise
    // POST a Language

    try {
        // Validate name and creator
        if (!req.body.name || !req.body.creator) {
            return res.status(400).json({
                message: 'Name and creator are required fields'
            });
        }

        let language = new Language({
            name: req.body.name,
            url: req.body.url,
            year_created: req.body.year_created,
            creator: req.body.creator,
            description: req.body.description,
            ide: req.body.ide 
                ? {
                    name: req.body.ide.name,
                    description: req.body.ide.description,
                    url: req.body.ide.url
            } : undefined,
            ide_extensions: Array.isArray(req.body.ide_extensions) 
                ? req.body.ide_extensions.map(ext => ({
                    extension: ext.extension,
                    description: ext.description
                })) : [],
            commonly_used: Array.isArray(req.body.commonly_used) 
                ? req.body.commonly_used.map(use => ({
                    use: use.use,
                    description: use.description
            })) :  []
        });

        language = await language.save(); // Save language data to db

        res.status(201).json({
            message: 'Language created successfully',
            data: language
        });
    } 
    catch (err) {
        console.error("Error creating language: ", err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation Error',
                error: err.message
            });
        } else {
            res.status(500).json({
                message: 'Failed to create language',
                error: err.message
            });
        }
    }
});

// Actual endpoint: "http://localhost:8888/language"
router.get('/', async (req, res) => {
    // GET all Languages

    try {
        const { name, creator } = req.query;
        let query = {};
        if (name) query.name = name;
        if (creator) query.creator = creator;

        const projection = 'name url year_created creator description ide ide_extensions commonly_used';

        let languages = await Language.find(query).select(projection);

        res.status(200).json({
            message: 'Languages fetched successfully',
            data: languages, // send this to the UI
        });
    } 
    catch (err) {
        console.error("Error fetching languages: ", err);

        res.status(500).json({
            message: 'Failed to fetch languages', 
            error: err.message,
        });
    }
});


// Actual endpoint: "http://localhost:8888/language/:id"
router.get('/:id', async (req, res) => {
    // GET a Language by ID

    const id = req.params.id;

    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }

    try {
        let language = await Language.findById(id);

        if (!language) {
            return res.status(404).json({
                message: 'Language not found'
            });
        } 

        res.status(200).json({
            message: 'Language fetched successfully',
            data: language
        });
    }
    catch (err) {
        console.error("Error fetching language: ", err);

        res.status(500).json({
            message: 'Failed to fetch language', 
            error: err.message
        });
    }
});

// Actual endpoint: "http://localhost:8888/language/:id"
router.patch('/:id', async (req, res) => {
    // UPDATE a language by ID

    const id = req.params.id;

    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }

    const updatedLanguage = req.body;

    // Check if body is empty
    if (Object.keys(updatedLanguage).length === 0) {
        return res.status(400).json({
            message: 'No update data provided'
        });
    }

    // Ensure validators run
    const options = { new: true, runValidators: true, useFindAndModify: false }

    try {
        let language = await Language.findByIdAndUpdate(
            id, updatedLanguage, options
        );

        if (!language) {
            return res.status(404).json({
                message: 'Language not found'
            });
        }

        res.status(200).json({
            message: 'Language updated successfully',
            data: language
        });
    }
    catch (err) {
        console.error("Error updating language: ", err);

        if (err.name === 'ValidationError') {
            res.status(400).json({
                message: 'Validation Error',
                error: err.message
            });
        } else {
            res.status(500).json({
                message: 'Failed to update language',
                error: err.message
            });
        }
    }
});

// Actual endpoint: "http://localhost:8888/language/:id"
router.delete('/:id', async (req, res) => {
    // DELETE a language by ID

    const id = req.params.id;

    // Check ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }

    try {
        let language = await Language.findByIdAndDelete(id);

        if (!language) {
            return res.status(404).json({
                message: 'Language not found'
            });
        }

        res.status(200).json({
            message: `Language '${language.name}' has been successfully deleted`
        });
    }
    catch (err) {
        console.error("Error deleting language: ", err);

        res.status(500).json({
            message: 'Failed to delete language', 
            error: err.message
        });
    }
});

module.exports = router;


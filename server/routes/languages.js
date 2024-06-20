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
        let language = new Language({
            name: req.body.name,
            url: req.body.url,
            year_created: req.body.year_created,
            creator: req.body.creator,
            description: req.body.description,
            ide: {
                name: req.body.ide.name,
                description: req.body.ide.description,
                url: req.body.ide.url
            },
            ide_extensions: req.body.ide_extensions.map(ext => ({
                extension: ext.extension,
                description: ext.description
            })),
            commonly_used: req.body.commonly_used.map(use => ({
                use: use.use,
                description: use.description
            }))
        });

        language = await language.save(); // waiting for saving language data to the database

        res.status(201).json({
            status: 201,
            message: 'Language created successfully',
            data: language
        });
    } 
    catch (err) {
        console.error(err);

        res.status(500).json({
            status: 500,
            message: 'Failed to create language', 
            error: err.message
        });
    }
});

// Actual endpoint: "http://localhost:8888/language/list"
router.get('/list', async (req, res) => {
    // GET all Languages

    try {
        let languages = await Language.find().select(
            'name url year_created creator description ide ide_url ide_extensions commonly_used'
        ); // find the database

        res.status(200).json({
            status: 200,
            message: 'Languages fetched successfully',
            data: languages, // send this to the UI
        });
    } 
    catch (err) {
        console.error("Error fetching languages", err);

        res.status(500).json({
            status: 500,
            message: 'Failed to fetch languages', 
            error: err.message,
        });
    }
});

// Actual endpoint: "http://localhost:8888/language/:name"
router.get('/:name', async (req, res) => {
    // GET a Language by NAME

    try {
        let language = await Language.findOne({ name: req.params.name });

        if (language) {
            res.status(200).json({
                status: 200,
                message: 'Language fetched successfully',
                data: language,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'Language not found'
            });
        }
    } 
    catch (err) {
        console.error("Error fetching language", err);

        res.status(500).json({
            status: 500,
            message: 'Failed to fetch language', 
            error: err.message
        });
    }
});

// Actual endpoint: "http://localhost:8888/language/:id"
router.patch('/:id', async (req, res) => {
    // UPDATE a language by ID

    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        let language = await Language.findByIdAndUpdate(
            id, updatedData, options
        );

        if (language) {
            res.status(200).json(
                {
                    status:200,
                    message: 'Language updated successfully',
                    data: language
                }
            );
        } else {
            res.status(404).json({
                status: 404,
                message: 'Language not found'
            });
        }
    }
    catch (err) {
        console.error("Error updating language", err);

        res.status(500).json({
            status: 500,
            message: 'Failed to update language', 
            error: err.message
        });
    }
});

// Actual endpoint: "http://localhost:8888/language/:id"
router.delete('/:id', async (req, res) => {
    // DELETE a language by ID

    try {
        const id = req.params.id;
        let language = await Language.findByIdAndDelete(id);

        if (language) {
            // Inform client if language deletion was successful
            res.status(200).json({
                status: 200,
                message: `Language ${language.name} has been successfully deleted`
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'Language not found, not deleted'
            });
        }
    }
    catch (err) {
        console.error("Error deleting language", err);

        res.status(500).json({
            stattus: 500,
            message: 'Failed to delete language', 
            error: err.message
        });
    }
});

module.exports = router;


// server/models/Language.js
//============================================================================
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let languageSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        }, 
        url: {
            type: String,
            length: 2048
        },
        year_created: {
            type: Number
        },
        creator: {
            type: String,
            required: true
        },
        description: {
            type: Text
        },
        ide: {
            type: String
        },
        ide_url: {
            type: String,
            length: 2048
        },
        ide_extensions: {
            type: String
        }, 
        commonly_used: {
            type: String
        }
    }
)
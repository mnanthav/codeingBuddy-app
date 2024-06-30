//================================================================
// server/models/Syntax.js
//================================================================
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let syntaxSchema = new Schema(
    {
        language: {
            type: Schema.Types.ObjectId,
            ref: 'language',
            required: true
        },
        name: {
            type: String
        },
        construct: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        syntax: {
            type: String
        },
        examples: [String],
        sources: [{
            name: {
                type: String
            },
            url: {
                type: String,
                validate: [urlValidator, 'Invalid URL'],
                maxLength: 2048
            },
            description: {
                type: String
            }
        }]
    },
    { timestamps: true }
);

function urlValidator(value) {
    return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value);
}

let Syntax = mongoose.model('Syntax', syntaxSchema);

module.exports = Syntax;

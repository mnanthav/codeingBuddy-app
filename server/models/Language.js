//================================================================
// server/models/Language.js
//================================================================
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let languageSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }, 
        url: {
            type: String,
            validate: [urlValidator, 'Invalid URL'],
            maxLength: 2048
        },
        year_created: {
            type: Number,
            min: [1900, 'Year must be after 1900'],
            max: [new Date().getFullYear(), `Year must be before ${new Date().getFullYear() + 1}`],
            validate: {
                validator: Number.isInteger,
                message: props => `${props.value} is not a valid year!`
            }
        },
        creator: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        ide: {
            type: {
                name: {
                    type: String,
                    maxLength: 30
                },
                description: {
                    type: String
                },
                url: {
                    type: String,
                    validate: [urlValidator, 'Invalid URL'],
                    maxLength: 2048
                }
            },
        },
        ide_extensions: {
            type: [{
                extension: {
                    type: String,
                },
                description: {
                    type: String
                }
            }],
            default: []
        }, 
        commonly_used: {
            type: [{
                use: {
                    type: String,
                },
                description: {
                    type: String
                }
            }],
            default: []
        }
    }, 
    { timestamps: true }
);

function urlValidator(value) {
    return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value);
}

let Language = mongoose.model('language', languageSchema);

module.exports = Language;
//const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const DocPulseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        what_changed: {
            type: String,
            required: true
        },
        added_document : {
            type: Boolean,
            required: true
        },
        product_name :{
            type: String,
            required: true
        },
        release_notes : {
            type: Boolean,
            required: true
        },
        updated_document : {
            type: Boolean,
            required: true
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("DocPulse", DocPulseSchema);
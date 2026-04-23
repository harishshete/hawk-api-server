const Document = require('../models/docPulse');

//Create Documents
exports.insertDocument = async (req, res, next) =>{

    if(req.body){
        const newDocument = new Document({
            title:req.body.title,
            what_changed:req.body.what_changed,
            added_document:req.body.added_document,
            product_name:req.body.product_name,
            release_notes:req.body.release_notes,
            updated_document:req.body.updated_document
        });

        try {
            const savedDocument = await newDocument.save();
            if(savedDocument)
            res.status(201).json(savedDocument);
        } catch (error) {
            res.status(500).json(error);
        }        
    }else{
        res.status(400).json("Something went wrong! Contact the administrator")
    }
}
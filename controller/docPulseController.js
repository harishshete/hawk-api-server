const Document = require('../models/docPulse');

//Create Documents
exports.insertDocument = async (req, res, next) =>{
    const tags =['added','updated','release_notes', 'critical'];
    const products = ['akana','blazemeter','p4','perfecto','puppet'];

    if(req.body && tags.includes(req.body.tag) && products.includes(req.body.product_name)){
        const newDocument = new Document({
            title:req.body.title,
            source_name:req.body.source_name,
            commit_id:req.body.commit_id,
            link:req.body.link,
            what_changed:req.body.what_changed,
            product_name:req.body.product_name,
            tag:req.body.tag
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

// Fetch documents by tags and product name
exports.getByTags = async (req, res, next) => {
    const product = req.params.product;
    const tags = req.params.tags;
    
    if (tags != 'all')
    {
        try {
            const documents = await Document.find({ product_name:product, tag:tags });
            res.status(200).json(documents);
        } catch (error) {
            res.status(500).json(error);
        }
    }  else {

        try {
            const documents = await Document.find({ product_name:product });
            res.status(200).json(documents);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

// Fetch documents by days and product name
exports.getBydays = async (req, res) => {
    const product = req.params.product;
    const days = parseInt(req.params.days, 10);

    try {
        // Current date
        const now = new Date();

        // Calculate past date
        const pastDate = new Date();
        pastDate.setDate(now.getDate() - days);

        //console.log(pastDate)
        const documents = await Document.find({
            product_name: product,
            createdAt: { $gte: pastDate }
        });

        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json(error);
    }


};

// Fetch last commit id by source name
exports.getLastCommitIdBySourceName = async (req, res) => {
    const source_name = req.params.source_name;
    try {
        const doc = await Document
            .findOne({ source_name: source_name })
            .sort({ createdAt: -1 })
            .select('commit_id -_id');

        if (!doc) {
            return res.status(404).json({ message: "No document found" });
        }
        res.status(200).json(doc);
    } catch (error) {
        res.status(500).json(error);
    }
};


// Fetch docunments by product name and date range
exports.getByDateRange = async (req, res) => {
    const product = req.params.product;
    const { startDate, endDate } = req.params;

    try {
        // Convert params → Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        // include full end day (till 23:59:59)
        end.setHours(23, 59, 59, 999);

        // Validate dates
        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const documents = await Document.find({
            product_name: product,
            createdAt: {
                $gte: start,
                $lte: end
            }
        });

        res.status(200).json(documents);

    } catch (error) {
        res.status(500).json(error);
    }
};
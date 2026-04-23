require('dotenv').config();
const mongoose = require('mongoose');

//console.log("printing URL variable => " + process.env.URL)
//console.log("printing LOCAL_URL variable => " + process.env.LOCAL_URL)
//  /?authSource=admin
mongoose.connect(process.env.URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
})
.then(()=>{console.log("DB Connected...");})
.catch((err)=>{console.log(err)});
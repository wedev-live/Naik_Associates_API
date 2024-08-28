const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    clientName: String,
    unitName: String,
    unitLocation: String,
    contacts: [{
        designation: String,
        department: String,
        mobile: String,
        mail: String,
    }],
    isDelete: Boolean
}, {timestamps:true})

module.exports = mongoose.model('Client', clientSchema )

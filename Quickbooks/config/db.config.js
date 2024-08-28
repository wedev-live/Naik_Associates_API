const mongoose = require('mongoose');

// MongoDB connection URI
const uri = "mongodb+srv://Dotsnekey:This15%5Epwd@dotsnkeycluster.yybxjxg.mongodb.net/Naik-Associates";

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('DB connection succeeded.');
})
.catch(err => {
    console.log('DB connection failed \nError:', err);
});

module.exports = mongoose;

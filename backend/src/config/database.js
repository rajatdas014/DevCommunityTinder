const mongoose = require('mongoose');


const connectDB = async () => {
    await mongoose.connect(
        'mongodb+srv://namastedev:4D6ZO8RQuKJw63yb@namastenode.tcetj.mongodb.net/devTinder'
    );
}

module.exports = connectDB

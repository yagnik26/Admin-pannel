const mongoose = require('mongoose');

let connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://yagnik:admin@cluster0.qljrdst.mongodb.net/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('db connected successfully');
    } catch (error) {
        console.log(error);        
    }
}

module.exports = connect;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    users: {
        type: [],
        required: false
    },
    message: {
        type:[{
            username: String,
            content: String
        }],
        required: false
    }
},{ collection: 'mesajlar', versionKey: false });


const Message = mongoose.model('mesajlar', messageSchema);

module.exports = Message;
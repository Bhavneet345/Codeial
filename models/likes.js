const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId, 
    }, 
    // this defines the objectId of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId, 
        required: true, 
        // for dynamic refernce 
        refpath: 'onModel'
    }, 
    // defines the type of the liked object since it is dynamic refernce
    onModel: {
        type: String,
        required: true, 
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
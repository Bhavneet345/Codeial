const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String, 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
    // include the array of the ids of all the comments in this post schema
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
    }], 
    likes: [{
        type: mongoose.Schema.ObjectId, 
        ref: 'Like'
    }]
}, {
    timestamps: true, 
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
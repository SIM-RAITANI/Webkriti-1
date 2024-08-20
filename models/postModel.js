const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    text: {
        type: String
    },
    postedBy: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    content: {
        type: String
    },
    category: {
        type: String,
        default: "Others"
    },
    image:{
        type:String,
    
    }

    ,
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String
    },
    authorEmail: {
        type: String
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    comments: [{
        text: {
            type: String
        },
        postedBy: {
            type: Date,
            default: Date.now
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        replies: [replySchema] // Array of replies for each comment
    }]
});

module.exports = mongoose.model("post", postSchema);

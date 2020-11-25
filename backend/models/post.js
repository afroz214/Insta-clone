import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }]
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

export default Post
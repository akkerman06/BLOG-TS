import mongoose from "mongoose";



const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },

    likes: [{type: mongoose.Types.ObjectId, ref: 'user'}],

    category: {
        type: String,
        default: ''
    },

    user: {type: mongoose.Types.ObjectId, ref: 'user'},

    image: {
        type: String,
        default: ''
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
})

export default mongoose.model('article', articleSchema)
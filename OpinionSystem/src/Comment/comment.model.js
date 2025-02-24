import { Schema, model } from "mongoose";

const commentSchema = Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text: {
            type: String,
            required: true
        },
        opinion: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Opinion'
        }
    },
    {
        versionKey: false, 
        timestamps: true 
    }
)

export default model('Comment', commentSchema)
import { Schema, model } from "mongoose"

const opinionSchema = Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true,
            maxLength: 25
        },
        text: {
            type: String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    },
    {
        versionKey: false, 
        timestamps: true 
    }
)

export default model('Opinion', opinionSchema)
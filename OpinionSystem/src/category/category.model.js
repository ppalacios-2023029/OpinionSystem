import { Schema, model } from "mongoose"

const categerySchema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            maxLength: 25
        },
        description: {
            type: String,
            required: true,
            maxLength: 50
        }
    },
    {
        versionKey: false, 
        timestamps: true
    }
)

export default model('Category', categerySchema)
import { Schema, model } from "mongoose"

const userSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 25
        },
        surname: {
            type: String,
            required: true,
            maxLength: 25
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            maxLength: 15
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 100
        },
        role:{
            type: String,
            required: true,
            uppercase: true,
            enum: ['ADMIN', 'USER'],
            default: 'USER'
        }
    },
    {
        versionKey: false, 
        timestamps: true 
    }
)

userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject() //Sirve para convertir un documento de MongoDB a Objeto de JS
    return user
}

export default model('User', userSchema)
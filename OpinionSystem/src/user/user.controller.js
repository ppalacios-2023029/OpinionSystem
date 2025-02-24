import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../Utils/encryp.js'
import { generateJwt } from '../../Utils/jwt.js'

export const addUser = async(req, res) =>{
    try{
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        await user.save()
        return res.send({message: `Register with ${user.username}`})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error with user registration', e})
    }
}

export const login = async(req, res) =>{
    try{
        let {userLoggin, password} = req.body
        let user = await User.findOne(
            {
                $or: [
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        )
        console.log(user)

        if(user && await checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.username}`,
                    loggedUser,
                    token
                }
                
            )
        }
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error with login function', e})
    }
}

export const upDate = async(req, res) =>{
    try{
        const {id} = req.params
        const data = req.body

        const update = await User.findByIdAndUpdate(
            id, 
            {
                name: data.name,
                surname: data.surname,
                username: data.username,
                email: data.email
            },
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User Update',
                user: update
            }
        )
    }catch(e){
        console.error('General error', e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                e
            }
        )
    }
}

export const updatePassword = async (req,res)=>{
    try{
        let {id} = req.params
        let {newPassword,oldPassword} = req.body
        let user = await User.findById(id)
        if(!user) return res.status(404).send(
            {
                succes: false,
                message: 'User not found',
            }
        )
        let compare = await checkPassword(user.password, oldPassword)
        if(!compare) return res.status(401).send(
            {
                succes: false,
                message: 'Old password is incorrect'
            }
        )
        user.password = await encrypt(newPassword)
        await user.save()
 
        return res.send(
            {
                succes: false,
                message: 'Password updated successfully'
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                succes: false,
                message: 'General error',
                e
            }
        )
    }
}
import User from './user.model.js'

const userDef = async (req, res) =>{
    try{
        const defUser = await User.findOne({name: 'Pablo'})
        if(!defUser){
            await User.create(
                {
                    name: 'Pablo',
                    surname: 'Palacios',
                    username: 'ppalacios',
                    email: 'ppalacios@gmail.com',
                    password: '12345689Pa&',
                    role: 'ADMIN'
                }
            )
            return res.status(200).send({message: 'Admin User created'})
        }

        return res.status(500).send({message: 'Error'})
    }catch(e){
        console.error('Error creating default category', e)
        return res.status(500).send({ message: 'General Error',e })
    }
}

export default userDef
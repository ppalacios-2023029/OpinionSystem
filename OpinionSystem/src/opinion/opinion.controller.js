import Opinion from '../opinion/opinion.model.js'

export const addOpinion = async(req, res) =>{
    try{
        let data = req.body
        let opinion = new Opinion(data)

        await opinion.save()
        return res.send({message: 'Your opinion is save'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error',e})
    }
}

export const getAll = async(req,res)=>{
    try{
        let opinion = await Opinion.find()
        if(!opinion) return res.send({message: `Opinions don't found`})
            return res.send({message: 'Opinions found', user})
    }catch(er){
        console.error(err)
        return res.status(500).send({message: 'Generate Error'. err})
    }
}

export const upDate = async(req, res) =>{
    try{
        const {id} = req.params
        const data = req.body

        const opinion = await Opinion.findById(id)
        if (!opinion) return res.status(404).send(
            {
            success: false,
            message: 'Opinion not found'
            }
        )


        if (opinion.author.toString() !== req.user.uid) {
            return res.status(403).send(
                {
                success: false,
                message: 'You are not authorized to edit this opinion'
                }
            )
        }

        const update = await Opinion.findByIdAndUpdate(
            id,
            {
                name: data.name,
                text: data.text
            },
            {new: true}
        )
        return res.send(
            {
                success: true,
                message: 'Opinion update',
                opinion: update
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

export const deleteOpn = async(req, res) => {
    try{
        let {id} = req.params

        const opinion = await Opinion.findById(id)
        if (!opinion) return res.status(404).send(
            {
            success: false,
            message: 'Opinion not found'
            }
        )

        if (opinion.author.toString() !== req.user.uid) {
            return res.status(403).send(
                {
                success: false,
                message: 'You are not authorized to edit this opinion'
                }
            )
        }
        await Opinion.deleteOne(opinion)
        return res.send({message: 'Opinion deleted'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error'})
    }
}
import Comment from './comment.model.js'

export const addComment =async(req, res) =>{
    try{
        let data = req.data
        let comment = new Comment(data)
        await comment.save()
        return res.send({message: 'Your comment is save'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
    }
}

export const upDate = async(req, res) =>{
    try{
        const {id} = req.params
        const data = req.body

        const comment = await Comment.findById(id)
        if(!comment) return res.status(404).send(
            {
                success: false,
                message: 'Comment not found'
            }
        )

        if(comment.author.toString() !== req.user.uid){
            return res.status(403).send(
                {
                    success: false,
                    message: 'You are not authorized to edit this comment'
                }
            )
        }

        const update = await Comment.findByIdAndUpdate(
            id,
            {text: data.text},
            {new: true}
            
        )
        return res.send(
            {
            success: false,
            message: 'Comment update',
            comment: update 
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

export const deleteCom = async(req, res) =>{
    try{
        let{id} = req.params

        const comment = await Comment.findById(id)
        if(!comment) return res.status(404).send(
            {
                success: false,
                message: 'Comment not found'
            }
        )

        if(comment.author.toString() !== req.user.uid){
            return res.status(403).send(
                {
                    success: false,
                    message: 'You are not authorized to edit this comment'
                }
            )
        }

        await Comment.deleteOne(comment)
        return res.send({message: 'Comment deleted'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error'})
    }
}
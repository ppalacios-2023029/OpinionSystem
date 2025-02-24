import Category from './category.model.js'

export const addCategory = async(req, res) =>{
    try{
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({message: `Category ${category.name} register`})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
    }
}

export const upDate = async(req, res) =>{
    try{
        const {id} = req.params
        const data = req.body

        const update = await Category.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'Category not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Category upDate',
                category: update
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

export const deleteCat = async(req,res)=>{
    try{
        let {id} = req.params

        let category = await Category.findById(id)
        if(!category) return res.send(
            {
                success: false,
                message: `Category don't found`
            }
        )

        const defaultCat = await Category.findOne({ name: 'Default' })
        if (!defaultCat) return res.status(404).send({
            success: false,
            message: 'Default category not found'
        })


        await Category.deleteOne(category)
        return res.send({message: 'Category deleted'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'Generate Error', e})
    }
}


import Category from './category.model.js'

const createDefCat = async (req, res) => {
    try {

        const defaultCategory = await Category.findOne({ name: 'Default' })
        if (!defaultCategory) {
            await Category.create({
                name: 'Default',
                description: 'Category default'
            })
            return res.status(201).send({ message: 'Default category created successfully' })
        }

        return res.status(200).send({ message: 'Default category already exists' })
    } catch (e) {
        console.error('Error creating default category:', e)
        return res.status(500).send({ message: 'Error creating default category',e })
    }
}

export default createDefCat
'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { limiter } from '../middlewares/rate.limit.js'
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import commentRoutes from '../src/Comment/comment.routes.js'
import opinionRoutes from '../src/opinion/opinion.routes.js'
import createDefCat from '../src/category/category.routes.js'
import userDef from '../src/user/user.routes.js'

const configs = (app) =>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes  =(app) =>{
    app.use('/createDefCat', createDefCat)
    app.use('/defUser', userDef)
    app.use('/user', userRoutes)
    app.use('/category', categoryRoutes)
    app.use('/opinion', opinionRoutes)
    app.use('/comment', commentRoutes)
}

export const initServer = () =>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server runnning in port ${process.env.PORT}`)
    }catch(e){
        console.error('Server init failed', e)
    }
}
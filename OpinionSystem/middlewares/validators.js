import { body } from "express-validator";
import { validateErrors } from "./validate.error.js";
import { existEmail, existUsername } from "../Utils/db.validators.js";

export const registerValidator = [
    body('name', 'Name cannot be empty')
    .notEmpty,
    body('surname','Surname cannot be empty')
    .notEmpty(),
    body('username','Username cannot be empty')
    .notEmpty()
    .toLowerCase()
    .custom(existUsername),
    body('email','Email cannot be empty')
    .notEmpty()
    .isEmail()
    .custom(existEmail),
    body('password','Password cannot be empty')
    .notEmpty()
    .isStrongPassword()
    .withMessage('Password must be Strong')
    .isLength({min: 8})
    .withMessage('Password need min characters'),
    validateErrors

]

export const opinionValidator =[
    body('author', 'Author cannot be empty')
    .notEmpty()
    .isObject(),
    body('title', 'Title cannot be empty')
    .notEmpty()
    .isLength({max: 25})
    .withMessage('Title max Limit'),
    body('text', 'Text cannot be empty')
    .notEmpty(),
    body('category', 'Category cannot be empty')
    .notEmpty()
    .isObject(),
    validateErrors
]

export const commentValidator = [
    body('author', 'Author cannot be empty')
    .notEmpty()
    .isObject(),
    body('text', 'Text cannot be empty')
    .notEmpty(),
    body('opinion', 'Opinion cannot be empty')
    .notEmpty()
    .isObject(),
    validateErrors
]


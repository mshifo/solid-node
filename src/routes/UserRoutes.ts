import { Router } from 'express'
import { all, find, update } from '../controllers/UserController';
import { ValidateMiddleware } from '../middlewares/ValidateMiddleware';
import { UserUpdateSchema } from '../middlewares/schemas/UsersSchema';

const userRoutes = Router()

userRoutes.get('/', all)
userRoutes.get('/:id', find)
userRoutes.put('/:id', ValidateMiddleware(UserUpdateSchema), update)

export default userRoutes;
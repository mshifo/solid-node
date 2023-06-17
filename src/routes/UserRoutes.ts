import { Router } from 'express'
import { all, find, update, exportFile } from '../controllers/UserController';
import { ValidateBody } from '../middlewares/ValidateBody';
import { UserUpdateSchema } from '../middlewares/schemas/UsersSchema';
import { ExportTypeSchema } from '../middlewares/schemas/ExportTypeSchema';
import { ValidateParams } from '../middlewares/ValidateParams';

const userRoutes = Router()

userRoutes.get('/', all)
userRoutes.get('/export/:type', ValidateParams(ExportTypeSchema), exportFile)
userRoutes.get('/:id', find)
userRoutes.put('/:id', ValidateBody(UserUpdateSchema), update)


export default userRoutes;
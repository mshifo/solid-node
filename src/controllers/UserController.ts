import { User } from "../models/User"
import { Request, Response } from 'express'
import { sendEmail } from "../services/SendEmails"

export const all = async (req: Request, res: Response) => {
    await User.findAll().then((users) => res.json(users)).catch(error => res.status(500).send(error))
}

export const find = async (req: Request, res: Response) => {
    await User.findByPk(req.params.id).then((user) => res.json(user)).catch(error => res.status(500).send(error))
}

export const update = async (req: Request, res: Response) => {
    await User.update(req.body, {
        where: {
            id: req.params.id,
        },
        individualHooks: true,
    }).then(() => {
        //sendEmail('dev.melshafaey@gmail.com', 'Profile Updated', 'Profile Updated'); 
        res.json({ success: true })
    }).catch(error => res.status(500).send(error))
}


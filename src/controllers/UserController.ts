import { User } from "../models/User"
import { Request, Response } from 'express'
import { sendEmail } from "../services/SendEmails"
import ExcelExporter from "../services/ExcelExporter"
import PdfExporter from "../services/PdfExporter"

export const all = async (req: Request, res: Response) => {
    await User.findAll().then((users) => res.json(users)).catch(error => res.status(500).json(error))
}

export const find = async (req: Request, res: Response) => {
    await User.findByPk(req.params.id).then((user) => res.json(user)).catch(error => res.status(500).json(error))
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
    }).catch(error => res.status(500).json(error))
}

export const exportFile = async (req: Request, res: Response) => {
    await User.findAll().then((users) => {
        const exporter = req.params.type === 'excel' ? new ExcelExporter(users) : new PdfExporter(users);
        exporter.exportFile().then((data) => {
            res.json({ "success": true, message: `File exported to path ${req.protocol}://${req.get('host')}/excel/export.xlsx` })
        }).catch(error => { console.log(error); res.status(500).json(error) });
    }).catch(error => res.status(500).json(error))
}



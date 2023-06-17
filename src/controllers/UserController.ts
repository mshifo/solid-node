import { User } from "../models/User"
import { Request, Response } from 'express'
import { ExcelExporter, PdfExporter, CashPayment, CardPayment } from "../classes"
import { exportData, payService, sendEmail } from '../services'

export const all = async (req: Request, res: Response) => {
    await User.findAll().then((users) => res.json(users)).catch(error => res.status(500).json(error))
}

export const find = async (req: Request, res: Response) => {
    await User.findByPk(req.params.id).then((user) => res.json(user)).catch(error => res.status(500).json(error))
}


//Task #1 Single Responsibility
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


//Task #2 Open/Closed
export const exportFile = async (req: Request, res: Response) => {
    await User.findAll().then((users) => {
        const exporter = req.params.type === 'excel' ? new ExcelExporter() : new PdfExporter();
        exportData(exporter, users).then((data) => {
            res.json({ "success": true, message: `File exported to path` })
        }).catch(error => { console.log(error); res.status(500).json(error) });
    }).catch(error => res.status(500).json(error))
}


//Task #3 Liskov Substitution 
export const pay = async (req: Request, res: Response) => {
    const cash = new CashPayment(20);
    const card = new CardPayment(20);
    try {
        const amount = payService(card)
        res.json({ "success": true, amount })
    } catch (error) {
        res.status(500).json(error)
    }

}



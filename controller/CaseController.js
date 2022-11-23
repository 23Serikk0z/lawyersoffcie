import {Case, User} from "../index.js";

export const create = async (req, res) => {
    try {
        const idlaw = req.body.idadvokat
        const idcli = req.body.idclient
        const idsud = req.body.idsudia
        const isStatus = req.body.idstatus

        const lawer = await User.findOne({
            where: {
                id: idlaw,
                type: 2
            }})
        const sudia = await User.findOne({
            where: {
                id: idsud,
                type: 3
            }
        })
        const client = await User.findOne({
            where: {
                id: idcli,
                type: 1
            }
        })
        if(!lawer){
            return res.status(404).json({message: 'Not found id law'})
        }
        if(!sudia){
            return res.status(404).json({message: 'Not found id sudia'})
        }
        if(!client){
            return res.status(404).json({message: 'Not found id client'})
        }

        await Case.create({
            idadvokat: idlaw,
            idclient: idcli,
            idsudia: idsud,
            idstatus: isStatus
        })
            .then((result) => res.status(200).json(result))
            .catch((err) => {
                console.log(err)
                res.status(400).json(err)
            })
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        })
    }
}

export const remove = async (req, res) =>{
    try {
        const c_id = req.params.id
        const cases = await Case.findOne({
            where: {
                id: c_id
            }
        })
        if(!cases){
            console.log('Uncurrect case id')
            return res.status(404).json({message: 'Uncurrect case id'})
        }
        else{
            await Case.destroy({
                where: {
                    id: c_id
                }
            })
            res.status(200).json({message: 'Case deleted'})
        }
    }catch (e) {

    }
}

export const getAll = async (req, res) =>{
    try {
        const allCases = await Case.findAll()
        res.status(200).json(allCases)
    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось вернуть кейсы'
        })
    }
}

export const update = async (req, res) => {
    try {

        const idlaw = req.body.idadvokat
        const idcli = req.body.idclient
        const idsud = req.body.idsudia
        const isStatus = req.body.idstatus

        const lawer = await User.findOne({
            where: {
                id: idlaw,
                type: 2
            }})
        const sudia = await User.findOne({
            where: {
                id: idsud,
                type: 3
            }
        })
        const client = await User.findOne({
            where: {
                id: idcli,
                type: 1
            }
        })
        const c_id = req.params.id
        const cases = await Case.findOne({
            where: {
                id: c_id
            }
        })
        if(!cases){
            console.log('Uncurrect case id')
            return res.status(404).json({message: 'Uncurrect case id'})
        }
        if(!lawer){
            return res.status(404).json({message: 'Not found id law'})
        }
        if(!sudia){
            return res.status(404).json({message: 'Not found id sudia'})
        }
        if(!client){
            return res.status(404).json({message: 'Not found id client'})
        }
        await Case.upsert({
            id: c_id,
            idadvokat: req.body.idadvokat,
            idclient: req.body.idclient,
            idsudia: req.body.idsudia,
            idstatus: req.body.idstatus
        }).then((result) => res.status(200).json(result))
            .catch((error) => {
                console.log(error)
                return res.status(400).json({message: 'some problem'})
            })

    }catch (e) {
        console.log(e)
        return res.status(500).json({message: 'Some problems with server'})
    }
}


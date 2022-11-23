import bcrypt, {compareSync, genSalt} from 'bcrypt';
import jwt from 'jsonwebtoken'
import {User, sequelize} from '../index.js'
export const register = async (req, res) =>{
    try {
        const emailExits = (await User.findOne({where: {email: req.body.email}}))
        if(emailExits) return res.status(400).json({message: 'User already uses'})
        else{
            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            await User.create({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: hash
            })
                .then((user) => res.status(200).json(user))
                .catch((err) => {
                    console.log(err)
                    res.status(400).json(err)
                })

            const token = jwt.sign({
                email: req.body.email
            }, 'secret123',{
                expiresIn: '30d'
            })
            console.log(token)
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось зарегистрироваться'
        })
    }
}

export const login = async (req, res) =>{
    try {
        const emailExits = (await User.findOne({where: {email: req.body.email}}))
        if(!emailExits){
            return res.status(404).json({message: 'Uncurrect login or password'})
        }
        else{
            const isValidPassword = await bcrypt.compare(req.body.password, emailExits.password)
            if(!isValidPassword){
                return res.status(404).json({message: 'Uncurrect login or password'})
            }
            res.status(200).json({message: 'Authed'})

            const token = jwt.sign({
                email: req.body.email
            }, 'secret123',{
                expiresIn: '30d'
            })
            console.log(token)
        }

    }catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось авторизоваться!'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findOne({
            where:{
                email: req.email
            }
        })
        if(!user){
            return res.status(404).json({
                message: 'Нет такого пользователя'
            })
        }
        res.status(200).json(user)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        })
    }
}
import { body } from 'express-validator';


export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('name', 'Укажите полное имя').isLength({min: 3}),
    body('surname', 'Неверная ссылка').isLength({min: 3}),
]

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5})
]

export const caseValidator = [
    body('idadvokat', 'Укажите правильный ID адвоката').isInt(),
    body('idclient', 'Укажите правильный ID клиента').isInt(),
    body('idsudia', 'Укажите правильный ID судьи').isInt(),
    body('idstatus', 'Укажите правильный статус').isBoolean()
]
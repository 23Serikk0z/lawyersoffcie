import express from 'express';
import * as UserController from "./controller/UserController.js";
import * as CaseController from './controller/CaseController.js'
import {loginValidator, registerValidator, caseValidator} from "./utils/validators.js";
import {DataTypes, Sequelize} from "sequelize";


import handleError from "./utils/handleError.js";
import checkAuth from "./utils/checkAuth.js";

const app = express()
const PORT = process.env.PORT || 5000;
app.use(express.json())


app.post('/auth/register', registerValidator, handleError, UserController.register)
app.post('/auth/login', loginValidator, handleError, UserController.login)
app.get('/auth/getme',checkAuth, UserController.getMe)


app.post('/case/casecreate', checkAuth, caseValidator, handleError, CaseController.create)
app.put('/case/:id', checkAuth, caseValidator, handleError, CaseController.update)
app.delete('/case/:id', checkAuth, handleError, CaseController.remove)
app.get('/case', checkAuth, CaseController.getAll)




export const sequelize = new Sequelize('lawyers',  'root', '', {
    dialect: 'mariadb',
    host: 'localhost',
    define: {
        timestamps: false
    }
})

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    surname:{
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        required: true
    }
})

export const Case = sequelize.define('cases', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idadvokat: {
        type: DataTypes.INTEGER
    },
    idclient: {
        type: DataTypes.INTEGER
    },
    idsudia: {
        type: DataTypes.INTEGER
    },
    idstatus: {
        type: DataTypes.BOOLEAN
    }
})

export const Delostati = sequelize.define('delostati', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idstati: {
        type: DataTypes.INTEGER
    },
    srok: {
        type: DataTypes.INTEGER
    },
    gonarar: {
        type: DataTypes.INTEGER
    }
})

export const Types = sequelize.define('types', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
})

export const Uk = sequelize.define('uk', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    max: {
        type: DataTypes.INTEGER
    },
    min: {
        type: DataTypes.INTEGER
    }
})


const startApp = async () => {
    try {
        app.listen(PORT, () => console.log(`Server was started on PORT: ${PORT}`))

    } catch (e) {
        console.log(e)
    }
}

startApp()
const router = require('express').Router()
const bcrypt = require('bcrypt')
const Joi = require('joi')
const db = require('../config/db')
const tables = require('../config/tables')
const { user_info, user_login, appointments, app_login, specialist_info, specialist_login } = tables

router.get('/', (req, res)=>{
    const query = `SELECT * FROM ${app_login}`
    try{
        db.query(query, (err, results)=>{
            if(err){
                res.status(400).json({status: false, message: err.sqlMessage})
                return
            }
            res.status(200).json({status: results.length > 0})
        })
    }catch(e){
        res.status(400).json({status: false, message: e.message})
    }
})

router.post('/login', (req, res)=>{
    const {username, password} = req.body
    const {value, error} = validateLogin(req.body)
    if(error){
        res.status(400).json({status: false, message: error.details[0].message})
        return
    }
    const query = `SELECT username, password FROM ${app_login} WHERE username = ?`
    try{
        db.query(query, [username], (err, result)=>{
            if(err){
                console.log(err)
                res.status(400).json({status: false, message: 'Failed', error: err})
                return
            }
            const data = result[0]
            if(!data){
                res.status(400).json({status: false, message: `There is no account with this [${username}]`})
                return
            }
            if(bcrypt.compareSync(password, data.password)){
                let d = data
                delete(d.password)
                res.status(200).json({status: true, message: 'Successful login', data: d})
            }else{
                res.status(400).json({status: false, message: 'Invalid email or password'})
            }
        })
    }catch(e){
        res.status(500).json({status: false, message: e.message})
    }
})

router.post('/create', (req, res)=>{
    const {username, password} = req.body
    const encPassword = bcrypt.hashSync(password, 10)
    const {value, error} = validateCreate(req.body)
    if(error){
        res.status(400).json({status: false, message: error.details[0].message})
        return
    }
    const data = {username, password: encPassword}
    const query = `INSERT INTO ${app_login} SET ?`

    try{
        db.query(query, data, (err, results, fields)=>{
            if(err){
                res.status(400).json({status: false, message: err.sqlMessage})
                return
            }
            console.log(results)
            res.status(200).json({status: true, message: 'Admin Account created'})
        })
    }catch(e){
        res.status(400).json({status: false, message: e.message})
    }
})

router.post('/add-specialist', (req, res)=>{
    const {firstname, lastname, dob, gender, specialty, email, password} = req.body
    const {value, error} = validateCreateSpecialist(req.body)
    if(error){
        res.status(400).json({status: false, message: error.details[0].message})
        return
    }

    const spec_info_query = `INSERT INTO ${specialist_info} SET ?`
    const spec_login_query = `INSERT INTO ${specialist_login} SET ?`

    const info_data = {firstname, lastname, dob, gender, specialty, email}
    const login_data = {email, password: bcrypt.hashSync(password, 10)}
    try{
        db.query(spec_info_query, info_data, (err, results, fields)=>{
            if(err){
                res.status(400).json({status: false, message: err.sqlMessage})
                return
            }
            try{
                db.query(spec_login_query, login_data, (err, results, fields)=>{
                    if(err){
                        res.status(400).json({status: false, message: err.sqlMessage})
                        return
                    }
                    res.status(200).json({status: true, message: 'Account created'})
                })
            }catch(e){
                res.status(400).json({status: false, message: `Specialist information saved with ID ${results.insertId}. Error message for creating login credentials is ${e.message}`})
            }
        })
    }catch(e){
        res.status(500).json({status: false, message: e.message})
    }
})

const validateCreate = obj => {
    const createScheme = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(4).max(20)
    })
    return createScheme.validate(obj)
}

const validateLogin = obj => {
    const createScheme = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(4).max(20)
    })
    return createScheme.validate(obj)
}

const validateCreateSpecialist = obj => {
    const createScheme = Joi.object({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        dob: Joi.date().required(),
        gender: Joi.string().min(1).required(),
        specialty: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(20)
    })
    return createScheme.validate(obj)
}

module.exports = router
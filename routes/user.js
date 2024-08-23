const router = require('express').Router()
const bcrypt = require('bcrypt')
const Joi = require('joi')
const db = require('../config/db')
const tables = require('../config/tables')
const { user_info, user_login, appointments } = tables

router.post('/login', (req, res)=>{
    const {email, password} = req.body
    const {value, error} = validateLogin(req.body)
    if(error){
        res.status(400).json({status: false, message: error.details[0].message})
        return
    }
    const query = `SELECT l.email, l.password, l.status, i.firstname, i.lastname, i.phone FROM ${user_login} l JOIN ${user_info} i ON l.email = i.email WHERE l.status = '1' AND l.email = ?`
    try{
        db.query(query, [email], (err, result)=>{
            if(err){
                console.log(err)
                res.status(400).json({status: false, message: 'Failed', error: err})
                return
            }
            const data = result[0]
            if(!data){
                res.status(400).json({status: false, message: `There is no account with this [${email}] email address`})
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
    const {firstname, lastname, phone, email, password} = req.body
    const encPassword = bcrypt.hashSync(password, 10)
    const {value, error} = validateCreate(req.body)
    if(error){
        res.status(400).json({status: false, message: error.details[0].message})
        return
    }
    const postInfoData = {firstname, lastname, phone, email}
    const postLoginData = {email, password: encPassword}
    const queryLogin = `INSERT INTO ${user_login} SET ?`
    const queryInfo = `INSERT INTO ${user_info} SET ?`

    try{
        db.query(queryInfo, postInfoData, (err, results, fields)=>{
            if(err){
                res.status(400).json({status: false, message: err.sqlMessage})
                return
            }
            try{
                db.query(queryLogin, postLoginData, (err, results, fields)=>{
                    if(err){
                        res.status(400).json({status: false, message: err.sqlMessage})
                        return
                    }
                    res.status(200).json({status: true, message: 'Account created'})
                })
            }catch(e){
                res.status(400).json({status: false, message: `Error: Personal information saved. ID: ${results.insertId}. Error message for saving login details (${e.message})`})
            }
        })
    }catch(e){
        res.status(500).json({status: false, message: e.message})
    }
})

router.post('/update-phone', (req, res)=>{
    const {email, phone} = req.body
    const {value, error} = validateUpdatePhone(req.body)
    if(error){
        res.status(400).json({status: false, message: error.details[0].message})
        return
    }
    const query = `UPDATE ${user_info} SET phone = ? WHERE email = ?`
    try{
        db.query(query, [phone, email], (err, result, fields)=>{
            if(err){
                res.status(400).json({status: false, message: err.sqlMessage})
                return
            }
            res.status(200).json({status: true, message: 'Record updated'})
        })
    }catch(e){
        res.status(500).json({status: false, message: e.message})
    }
})

router.post('/update-password', (req, res)=>{
    const {email, password} = req.body
    const newP = bcrypt.hashSync(password, 10)
    const {value, error} = validateLogin(req.body)
    if(error){
        res.status(400).json({status: false, message: error.details[0].message})
        return
    }
    const query = `UPDATE ${user_login} SET password = ?  WHERE email = ?`
    try{
        db.query(query, [newP, email], (err, result, fields)=>{
            if(err){
                res.status(400).json({status: false, message: err.sqlMessage})
                return
            }
            res.status(200).json({status: true, message: 'Password updated'})
        })
    }catch(e){
        res.status(500).json({status: false, message: e.message})
    }
})

router.post('/book-appointment', (req, res)=>{
    const {value, error} = validateBookAppointment(req.body)
    if(error){
        res.status(400).json({status: false, message: error.details[0].message})
        return
    }
    const query = `INSERT INTO ${appointments} SET ?`
    const isQuery = `SELECT * FROM ${appointments} WHERE app_type = ? AND doctor=? AND app_time = ? AND app_date = ?`
    try{
        db.query(isQuery, [req.body.app_type, req.body.doctor, req.body.app_time, req.body.app_date], (err, results, fields)=>{
            if(err){
                res.status(400).json({status: false, message: err.sqlMessage})
                return
            }
            const data = results[0]
            if(data){
                res.status(400).json({status: false, message: 'Please book at a different time. Thank you'})
                return
            }
            try{
                db.query(query, req.body, (err, result, field)=>{
                    if(err){
                        res.status(400).json({status: false, message: err.sqlMessage})
                        return
                    }
                    res.status(200).json({status: true, message: 'Appointments successfully booked'})
                })
            }catch(e){
                res.status(500).json({status: false, message: e.message})
            }
        })
    }catch(e){
        res.status(500).json({status: false, message: e.message})
    }
})

router.get('/appointments', (req, res)=>{
    const query = `SELECT * FROM ${appointments} WHERE email = ?`
    try{
        db.query(query, [req.query.email], (error, results)=>{
            if(error){
                res.status(400).json({status: false, message: error.sqlMessage})
                return
            }
            res.status(200).json({status: true, data: results})
        })
    }catch(e){
        res.status(500).json({status: false, message:  e.message})
    }
})

router.get('/doctor-appointments', (req, res)=>{
    const query = `SELECT * FROM ${appointments}`
    try{
        db.query(query, (error, results)=>{
            if(error){
                res.status(400).json({status: false, message: error.sqlMessage})
                return
            }
            res.status(200).json({status: true, data: results})
        })
    }catch(e){
        res.status(500).json({status: false, message:  e.message})
    }
})

router.get('/appointments/:id', (req, res)=>{
    const {id} = req.params
    const query = `SELECT * FROM ${appointments} WHERE id = ?`
    try{
        db.query(query, [id], (error, results)=>{
            if(error){
                res.status(400).json({status: false, message: error.sqlMessage})
                return
            }
            res.status(200).json({status: true, data: results[0]})
        })
    }catch(e){
        res.status(500).json({status: false, message: e.message})
    }
})

router.delete('/delete-appointment/:id', (req, res)=>{
    const {id} = req.params
    const query = `DELETE FROM ${appointments} WHERE id = ?`
    try{
        db.query(query, [id], (error, results)=>{
            if(error){
                res.status(400).json({status: false, message: error.sqlMessage})
                return
            }
            res.status(200).json({status: true, data: results})
        })
    }catch(e){
        res.status(500).json({status: false, message:  e.message})
    }
})

const validateCreate = obj => {
    const createScheme = Joi.object({
        firstname: Joi.string().min(2).required(),
        lastname: Joi.string().min(2).required(),
        phone: Joi.string().min(10).max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(20)
    })
    return createScheme.validate(obj)
}

const validateLogin = obj => {
    const createScheme = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(20)
    })
    return createScheme.validate(obj)
}

const validateUpdatePhone = obj => {
    const createScheme = Joi.object({
        email: Joi.string().email().required(),
        phone: Joi.string().min(10).max(10).required()
    })
    return createScheme.validate(obj)
}

const validateBookAppointment = obj => {
    const createScheme = Joi.object({
        email: Joi.string().email().required(),
        app_type: Joi.string().required(),
        doctor: Joi.string().required(),
        app_date: Joi.string().required(),
        app_time: Joi.string().required(),
        app_comment: Joi.string().allow(''),
        video_url: Joi.string().allow('')
    })
    return createScheme.validate(obj)
}

module.exports = router
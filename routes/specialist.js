const router = require('express').Router()
const bcrypt = require('bcrypt')
const Joi = require('joi')
const db = require('../config/db')
const tables = require('../config/tables')
const { user_info, user_login, appointments, specialist_info, specialist_login } = tables

router.get('/', (req, res)=>{
    const query = `SELECT * FROM ${specialist_info}`
    try{
        db.query(query, (err, results)=>{
            if(err){
                res.status(400).json({status: false, message: err.sqlMessage})
                return
            }
            res.status(200).json({status: results.length > 0, data: results})
        })
    }catch(e){
        res.status(400).json({status: false, message: e.message})
    }
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id
    const query = `DELETE FROM ${specialist_info} WHERE id = ?`
    try{
        db.query(query, [id], (err, result)=>{
            if(err){
                res.status(401).json({status: false, message: err.sqlMessage})
                return
            }
            res.status(200).json({status:true, message: 'Record deleted'})
        })
    }catch(e){
        res.status(500).json({status:false, message: e.message})
    }
})

router.post('/login', (req, res)=>{
    const {username, password} = req.body
    const {value, error} = validateLogin(req.body)
    if(error){
        res.status(400).json({status: false, message: error.details[0].message})
        return
    }
    const query = `SELECT l.email, l.password, i.id, i.firstname, i.lastname, i.dob, i.specialty FROM ${specialist_login} l JOIN ${specialist_info} i ON l.email = i.email WHERE l.email = ?`
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

router.get('/appointments', (req, res)=>{
    // const query = `SELECT * FROM ${appointments} WHERE app_type = ?`
    const query = `SELECT a.id, a.email, a.app_type, a.doctor, a.app_comment, a.video_url, a.app_time, a.app_date, a.assigned_to, a.created_at, i.firstname, i.lastname FROM ${appointments} a JOIN ${user_info} i ON a.email = i.email WHERE a.doctor = ?`
    try{
        db.query(query, [req.query.doctor], (error, results)=>{
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

const validateLogin = obj => {
    const createScheme = Joi.object({
        username: Joi.string().email().min(3).required(),
        password: Joi.string().min(4).max(20)
    })
    return createScheme.validate(obj)
}

module.exports = router
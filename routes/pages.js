const router = require('express').Router()
const path = require('path')

router.get('/', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'index.htm')
    res.sendFile(file)
})

router.get('/user-dash', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'userdash.htm')
    res.sendFile(file)
})

router.get('/user-personal-info', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'userinfo.htm')
    res.sendFile(file)
})

router.get('/user-book-appointment', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'userappointment.htm')
    res.sendFile(file)
})

router.get('/user-appointment-history', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'userhistory.htm')
    res.sendFile(file)
})

router.get('/user-appointment-history/:id', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'userhistoryview.htm')
    res.sendFile(file)
})

router.get('/user-settings', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'usersettings.htm')
    res.sendFile(file)
})

router.get('/admin-login', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'adminlogin.htm')
    res.sendFile(file)
})

router.get('/admin-dash', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'admindash.htm')
    res.sendFile(file)
})

router.get('/admin-specialist', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'admin_spec.htm')
    res.sendFile(file)
})

router.get('/admin-add-specialist', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'adminadd.htm')
    res.sendFile(file)
})

router.get('/specialist', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'spec_login.htm')
    res.sendFile(file)
})

router.get('/specialist-dash', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'spec_dash.htm')
    res.sendFile(file)
})

router.get('/specialist-appointments', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'spec_app.htm')
    res.sendFile(file)
})

router.get('/specialist-appointment-view/:id', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'spec_app_view.htm')
    res.sendFile(file)
})

router.get('/specialist-info', (req, res)=>{
    const p = path.parse(__dirname).dir
    const file = path.join(p, 'public', 'views', 'spec_info.htm')
    res.sendFile(file)
})

module.exports = router
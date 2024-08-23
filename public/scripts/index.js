const url = 'http://localhost:4000/api/users'
let reg = false
const regHolder = document.querySelector('#reg')
const cap = document.querySelector('#cap')
const capBtn = document.querySelector('#capBtn')
const btn = document.querySelector('#btn')
const title = document.querySelector('#title')

const toggleRegView = () => {
    if(reg) {
        title.innerHTML = 'Create Account'
        btn.innerHTML = 'Create Account'
        regHolder.classList.remove('display-none')
        regHolder.classList.add('display-block')
        cap.innerHTML = 'Already have an account?'
        capBtn.innerHTML = 'Login'
    }else{
        title.innerHTML = 'Login'
        btn.innerHTML = 'Login'
        cap.innerHTML = 'Don\'t have an account'
        capBtn.innerHTML = 'Create a new Account'
        regHolder.classList.remove('display-block')
        regHolder.classList.add('display-none')
    }
}
toggleRegView()

const state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: ''
}

const setReg = () => {
    reg = !reg
    setTimeout(()=>toggleRegView(),)
}

const onChange = e => state[e.target.name] = e.target.value

const onSubmit = e => {
    e.preventDefault()
    btn.innerHTML = 'Loading...'
    const { email, firstname, lastname, password, phone } = state
    const regContext = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
    }
    const loginContext = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    }
    if(reg){
        if(!(email && firstname && lastname && password && phone)){
            toast('All the fields are required')
            btn.innerHTML = 'Create Account'
            return
        }
        
        fetch(`${url}/create`, regContext)
        .then(res=>res.json())
        .then(res=>{
            if(res.status){
                toast(res.message, res.status)
                setReg()
                return
            }
            toast(res.message)
            btn.innerHTML = 'Create Account'
        })
        .catch(err=>{
            toast(err.message)
            btn.innerHTML = 'Create Account'
        })
    }else{
        if(!(email && password)){
            toast('All the fields are required')
            btn.innerHTML = 'Login'
            return
        }
        fetch(`${url}/login`, loginContext)
        .then(res=>res.json())
        .then(res=>{
            if(res.status){
                toast(res.message, res.status)
                const info = {email: res.data.email, firstname: res.data.firstname, lastname: res.data.lastname, phone: res.data.phone}
                const log_in = {email: res.data.email}
                localStorage.setItem('user-info', JSON.stringify(info))
                localStorage.setItem('user-login', JSON.stringify(log_in))
                window.location.href = '/user-dash'
                return
            }
            toast(res.message)
            btn.innerHTML = 'Login'
        })
        .catch(err=>{
            toast(err.message)
            btn.innerHTML = 'Login'
        })
    }
}


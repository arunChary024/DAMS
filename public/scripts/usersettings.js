const emailTag = document.querySelector('#email')
const oldPasswordTag = document.querySelector('#oldpassword')
const newPasswordTag = document.querySelector('#newpassword')
const confirmPasswordTag = document.querySelector('#confirmpassword')
const btn = document.querySelector('#btn')

const stateObj = {
    email: '',
    oldpass: '',
    newpass: '',
    confirmpass: ''
}

const setUser = () => {
    let obj = localStorage.getItem('user-login')
    if(obj){
        obj = JSON.parse(obj)
        stateObj['email'] = obj.email
        emailTag.setAttribute('value', obj.email)
    }
}
setUser()

const onChange = e => stateObj[e.target.name] = e.target.value

const onSubmit = e => {
    e.preventDefault()
    btn.innerHTML = 'Loading...'
    const {email, oldpass, newpass, confirmpass} = stateObj
    if(!(email && oldpass && newpass && confirmpass)){
        toast('All the fields are required')
        btn.innerHTML = 'Update Password'
        return
    }

    const loginContext = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password: oldpass})
    }

    const passContext = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password: newpass})
    }

    if(!(newpass === confirmpass)){
        toast('New and confirm passwords are not matching')
        btn.innerHTML = 'Update Password'
        return
    }

    fetch(`${url}/login`, loginContext)
    .then(res=>res.json())
    .then(res=>{
        if(res.status){
            fetch(`${url}/update-password`, passContext)
            .then(response=>response.json())
            .then(response=>{
                if(response.status){
                    toast(response.message, response.status)
                    setTimeout(()=>window.location.reload(), 1500)
                    return
                }
                toast(response.message)
                btn.innerHTML = 'Update Password'
                return
            })
            .catch(error=>{
                toast(error.message)
                btn.innerHTML = 'Update Password'
                return
            })
            return
        }
        toast(res.message)
        btn.innerHTML = 'Update Password'
    })
    .catch(err=>{
        toast(err.message)
        btn.innerHTML = 'Update Password'
    })
}
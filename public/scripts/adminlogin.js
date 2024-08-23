const url = 'http://localhost:4000/api/admin'

const state = {
    username: '',
    password: '',
    status: false
}

const button = document.querySelector('button#btn')
const title = document.querySelector('#title')

const onChange = e => state[e.target.name] = e.target.value

const isAccountActive = () => {
    fetch(url)
    .then(res=>res.json())
    .then(res=> {
        state['status'] = res.status
        title.innerHTML = res.status ? 'Admin Login' : 'Create Admin Account'
        button.innerHTML = res.status ? 'Login' : 'Create Account'
    })
    .catch(err=>console.log(err))
}

isAccountActive()

const onSubmit = e => {
    e.preventDefault()
    const {username, password, status} = state
    const endpoint_url = `${url}/${status ? 'login' : 'create'}`
    const context = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    }
    if(!(username && password)){
        toast('All the fields are required')
        return
    }
    fetch(endpoint_url, context)
    .then(res=>res.json())
    .then(res=>{
        if(res.status){
            if(status){
                localStorage.setItem('admin-info', JSON.stringify(res))
                window.location.href = '/admin-dash'
            }else{
                toast(res.message, res.status)
                isAccountActive()
            }
        }else{
            toast(res.message)
        }
    })
    .catch(err=>{
        toast(err.message)
    })
}
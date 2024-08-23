const url = 'http://localhost:4000/api/specialist'

const state = {
    username: '',
    password: '',
}

const button = document.querySelector('button#btn')

const onChange = e => state[e.target.name] = e.target.value

const onSubmit = e => {
    e.preventDefault()
    const {username, password} = state
    const endpoint_url = `${url}/login`
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
            localStorage.setItem('spec-info', JSON.stringify(res.data))
            window.location.href = '/specialist-dash'
        }else{
            toast(res.message, res.status)
        }
        
    })
    .catch(err=>{
        toast(err.message)
    })
}
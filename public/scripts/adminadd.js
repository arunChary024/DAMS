const select = document.querySelector('select')
const button = document.querySelector('button')

let selectString = '<option value="">Select a specialty</option>'

types.forEach(item=> selectString += `<option value="${item}">${item}</option>`)

select.innerHTML = selectString

const state = {
    firstname: '',
    lastname: '',
    dob: '',
    gender: '',
    specialty: '',
    email: '',
    password: ''
}

const onChange = e => state[e.target.name] = e.target.value

const onSubmit = e => {
    e.preventDefault()
    button.innerHTML = 'Loading...'
    const {firstname, lastname, dob, gender, specialty, email, password} = state

    if(!(firstname && lastname && dob && gender && specialty && email && password)){
        toast('All the fields are required')
        button.innerHTML = 'Add Specialist'
        return
    }

    const context = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
    }

    fetch(`${url}/add-specialist`, context)
    .then(res=>res.json())
    .then(res=>{
        toast(res.message, res.status)
        button.innerHTML = 'Add Specialist'
        if(res.status) e.target.reset()
    })
    .catch(err=>{
        toast(err.message)
        button.innerHTML = 'Add Specialist'
    })
}
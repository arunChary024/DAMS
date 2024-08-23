const firstname = document.querySelector('#firstname')
const lastname = document.querySelector('#lastname')
const dob = document.querySelector('#dob')
const specialist = document.querySelector('#specialty')
const btn = document.querySelector('#btn')

let stateObj = null

const setState = () => {
    const info = localStorage.getItem('spec-info')
    if(!info) return
    stateObj = JSON.parse(info)
}

setState()

const setForm = () => {
    console.log(stateObj)
    firstname.setAttribute('value', stateObj?.firstname ?? '')
    lastname.setAttribute('value', stateObj?.lastname ?? '')
    dob.setAttribute('value', stateObj?.dob.split('T')[0] ?? '')
    specialist.setAttribute('value', stateObj?.specialty ?? '')
}
setTimeout(()=>setForm(),)

const onChange = e => stateObj[e.target.name] = e.target.value

const onSubmit = e => {
    e.preventDefault()
    btn.innerHTML = 'Loading...'
    const {email, phone} = stateObj
    const context = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, phone})
    }
    fetch(`${url}/update-phone`, context)
    .then(res=>res.json())
    .then(res=>{
        if(res.status){
            toast(res.message, res.status)
            btn.innerHTML = 'Update Info'
            localStorage.setItem('user-info', JSON.stringify(stateObj))
            setTimeout(()=>window.location.reload(),1500)
            return
        }
        toast(res.message)
        btn.innerHTML = 'Update Info'
    })
    .catch(err=>{
        toast(err.message)
        btn.innerHTML = 'Update Info'
    })
}
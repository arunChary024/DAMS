const localState = {
    email: ''
}
const thead = document.querySelector('thead')
const tbody = document.querySelector('tbody')

const t_headContent = ['', 'Fullname', 'Email', 'Specialist', 'Action']

const setTHead = () => {
    let string = `<tr>`
    t_headContent.forEach(item=>string += `<th>${item}</th>`)
    string += `<tr>`
    thead.innerHTML = string
}
setTHead()

const deleteSpecialist = id => {
    const context = {
        method: 'DELETE'
    }
    const u_url = url.replace('admin', 'specialist')
    fetch(`${u_url}/${id}`, context)
    .then(res=>res.json())
    .then(res=>{
        toast(res.message, res.status)
        if(res.status) getSpecialist()
    })
    .catch(err=>console.log(err))
}

const displayData = data => {
    let string = ''
    if(!data || data.lenght === 0){ 
        tbody.innerHTML = `<td colspan="5"></td>`
        return
    }
    if(data.length === 0){ 
        tbody.innerHTML = `<td colspan="5"></td>`
        return
    }
    data.forEach(({id, firstname, lastname, specialty, email}, index)=>{
        string += `
            <tr>
                <td>${index+1}</td>
                <td>${firstname} ${lastname}</td>
                <td>${email}</td>
                <td>${specialty}</td>
                <td><button class="viewApp" onclick="deleteSpecialist(${id})">Delete</button></td>
            </tr>
        `
    })
    tbody.innerHTML = string
}

const getSpecialist = () => {
    const u_rl = `${url}`.replace('admin', 'specialist')
    fetch(`${u_rl}`)
    .then(res=>res.json())
    .then(res=>{
        displayData(res.data)
    })
    .catch(err=>console.log(err))
}

setTimeout(()=>getSpecialist(), 500)
const localState = {
    email: ''
}
const thead = document.querySelector('thead')
const tbody = document.querySelector('tbody')

const t_headContent = ['', 'Appointment Type', 'Date', 'Time', 'Action']

const setTHead = () => {
    let string = `<tr>`
    t_headContent.forEach(item=>string += `<th>${item}</th>`)
    string += `<tr>`
    thead.innerHTML = string
}
setTHead()

const viewAppointment = id => window.location.href = `/user-appointment-history/${id}`
const deleteApp = id => {
    const context = {
        method: 'DELETE'
    }
    const u_url = `${url}/delete-appointment/${id}`
    fetch(u_url, context)
    .then(res=>res.json())
    .then(res=>{
        if(res.status) window.location.reload()
        else toast(res.message)
    })
    .catch(err=>console.log(err))
}

const displayData = data => {
    let string = ''
    if(!data){ 
        tbody.innerHTML = `<td colspan="5"></td>`
        return
    }
    if(data.length === 0){ 
        tbody.innerHTML = `<td colspan="5"></td>`
        return
    }
    data.forEach(({id, app_type, app_time, app_date}, index)=>{
        string += `
            <tr>
                <td>${index+1}</td>
                <td>${app_type}</td>
                <td>${new Date(app_date).toLocaleDateString()}</td>
                <td>${app_time}</td>
                <td>
                    <button style="padding: 3px" class="viewApp" onclick="viewAppointment(${id})">View</button>
                    <button style="padding: 3px; background-color: red; color: #fff" class="viewApp" onclick="deleteApp(${id})">Cancel</button>
                </td>
            </tr>
        `
    })
    tbody.innerHTML += string
}

const getData = () => {
    const data = localStorage.getItem('user-login')
    if(!data) return
    const d = JSON.parse(data)
    localState['email'] = d.email
}
getData()

const getHistory = () => {
    fetch(`${url}/appointments?email=${localState.email}`)
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        displayData(res.data)
    })
    .catch(err=>toast(err.message))
}

setTimeout(()=>getHistory(), 500)
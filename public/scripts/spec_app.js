const localState = {
    specialty: '',
    id: ''
}
const thead = document.querySelector('thead')
const tbody = document.querySelector('tbody')

const t_headContent = ['', 'Patient Name', 'Appointment Type', 'Date', 'Time', 'Action']

const setTHead = () => {
    let string = `<tr>`
    t_headContent.forEach(item=>string += `<th>${item}</th>`)
    string += `<tr>`
    thead.innerHTML = string
}
setTHead()

const viewAppointment = id => window.location.href = `/specialist-appointment-view/${id}`

const displayData = data => {
    let string = ''
    if(!data){ 
        tbody.innerHTML = `<td colspan="6"></td>`
        return
    }
    if(data.length === 0){ 
        tbody.innerHTML = `<td colspan="6"></td>`
        return
    }
    data.forEach((item, index)=>{
        string += `
            <tr>
                <td>${index+1}</td>
                <td>${item?.firstname ?? ''} ${item?.lastname ?? ''}</td>
                <td>${item.app_type}</td>
                <td>${new Date(item.app_date).toLocaleDateString()}</td>
                <td>${item.app_time}</td>
                <td><button style="padding: 3px;" onclick="viewAppointment(${item.id})">View</button></td>
            </tr>
        `
    })
    tbody.innerHTML += string
}

const getData = () => {
    const data = localStorage.getItem('spec-info')
    if(!data) return
    const d = JSON.parse(data)
    localState['specialty'] = d.specialty
    localState['id'] = d.id
}
getData()

const getHistory = () => {
    fetch(`${url}/appointments?doctor=${localState.id}`)
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        displayData(res.data)
    })
    .catch(err=>toast(err.message))
}

setTimeout(()=>getHistory(), 500)
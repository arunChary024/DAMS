const timeChoice = {
    'AM': {
        8: [
            '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
            '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
        ],
        9: [
            '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', 
            '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
        ],
        10: [
            '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', 
            '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
        ],
        11: [
            '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', 
            '4:00 PM', '4:30 PM'
        ]
    },
    'PM': {
        12: [
            '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
        ],
        1: ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'],
        2: ['3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'],
        3: ['4:00 PM', '4:30 PM']
    }
}

let allAppointments = []
let doctors = []
const getDoctors = () => {
    const u_rl = `${url}`.replace('/users', '/specialist')
    fetch(`${u_rl}`)
    .then(res=>res.json())
    .then(res=>doctors = res?.data ?? [])
    .catch(err=>console.log(err))
}
getDoctors()

const getAppointments = () => {
    fetch(`${url}/doctor-appointments`)
    .then(res=>res.json())
    .then(res=> allAppointments = res?.data ?? [])
    .catch(err=>console.log(err))
}
getAppointments()


const state = {
    email: '',
    app_type: '',
    app_date: '',
    app_time: '',
    doctor: '',
    app_comment: '',
    video_url: ''
}

const setObj = () => {
    let obj = localStorage.getItem('user-login')
    if(obj){
        obj = JSON.parse(obj)
        state['email'] = obj.email
    }
}
setObj()

const appointmentTypeTag = document.querySelector('#appointment-type')
const doctorTag = document.querySelector('#doctor')
const appTimeTag = document.querySelector('#app-time')
const btn = document.querySelector('#btn')

let app_string = `<option value="">Select Appointment Type</option>`
types.forEach(item=>{
    app_string += `<option value="${item}">${item.toUpperCase()}</option>`
})
appointmentTypeTag.innerHTML = app_string

const setTimeSlot = data => {
    if(data.length === 0){
        let appTimeString = `<option value="">Select Appointment Time</option>`
        appTime.forEach(item=>{
            appTimeString += `<option value="${item}">${item}</option>`
        })
        appTimeTag.innerHTML = appTimeString
    }else{
        let appTimeString = `<option value="">Select Appointment Time</option>`
        data.forEach(item=>{
            appTimeString += `<option value="${item}">${item}</option>`
        })
        appTimeTag.innerHTML = appTimeString
    }
}

const onChange = e => state[e.target.name] = e.target.value
const onSelect = e => {
    state[e.target.name] = e.target.value
    if(e.target.value === '') return
    const filterDoctors = doctors.filter(item=>item.specialty === e.target.value)
    if(filterDoctors.length === 0){
        doctorTag.innerHTML = `<option value="">Not Available</option>`
    }
    let doctorString = `<option value="">Select a Doctor</option>`
    filterDoctors.forEach(item=> doctorString += `<option value="${item.id}">${item.firstname.toUpperCase()} ${item.lastname.toUpperCase()}</option>`)
    doctorTag.innerHTML = doctorString
}

const onSelectDate = e => {
    const {doctor} = state
    if(!(doctor)){
        e.target.value = ''
        toast('You must select a specialist before you can select a time slot')
        return
    }
    state[e.target.name] = e.target.value
    const filterD = allAppointments.filter(item=>item.doctor === doctor)
    if(filterD.length === 0) {
        setTimeSlot([])
        return
    }
    let todayApp = []
    filterD.forEach(item=>{
        if(item.app_date.split('T')[0] === e.target.value) todayApp.push(item.app_time)
    })
    if(todayApp.length === 0){
        setTimeSlot(todayApp)
        return
    }
    let newTimeData = []
    appTime.forEach(item=>{
        if(!todayApp.includes(item)) newTimeData.push(item)
    })
    setTimeSlot(newTimeData)
}

const onSubmit = e => {
    e.preventDefault()
    btn.innerHTML = 'Submitting...'
    const context = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(state)
    }
    const {email, app_type, app_date, app_time, doctor, app_comment, video_url} = state
    if(!(email && app_type && app_date && app_time && doctor)) {
        toast('All the fields are required')
        btn.innerHTML = 'Book Appointment'
        return
    }

    const todayDate = new Date()
    const [yyyy, mm, dd] = app_date.split('-')

    const [hr, mins, secs] = todayDate.toLocaleTimeString().split(':')
    const [_, ampm] = secs.split(' ')

    // selected app_time split
    // const [t_ime, am] = app_time.split(' ')
    // const [h, m] = t_ime.split(':')

    if((new Date(`${mm}/${dd}/${yyyy}`).getTime() < new Date(todayDate.toLocaleDateString()).getTime())){
        toast(`You cannot book an appointment for this date!`)
        btn.innerHTML = 'Book Appointment'
        return
    }

    if(new Date(`${mm}/${dd}/${yyyy}`).getTime() === new Date(todayDate.toLocaleDateString()).getTime()){
        const h = Number(hr) > 12 ? Number(hr) - 1 : hr
        if(h >= 4){
            toast('Please book an appointment for tomorrow or a later date. Thank you')
            btn.innerHTML = 'Book Appointment'
            return
        }
        const choice = (timeChoice[ampm][Number(h)])
        if(!choice.includes(app_time)){
            toast(`You are currently accessing the appointments page today(@${new Date().toLocaleTimeString()}). Therefore, you can only book an appointment from ${choice[0]} onwards. Thank you`, false, 10000)
            btn.innerHTML = 'Book Appointment'
            return
        }
    }

    fetch(`${url}/book-appointment`, context)
    .then(res=>res.json())
    .then(res=>{
        if(res.status){
            toast(res.message, res.status)
            setTimeout(()=>window.location.reload(), 2000)
            return
        }
        toast(res.message)
        btn.innerHTML = 'Book Appointment'
    })
    .catch(err=>{
        toast(err.message)
        btn.innerHTML = 'Book Appointment'
    })
}
const visitURL = url => window.location.href = url

const menuOptions = [
    {cls: 'appointment', name: 'Speciality Information', url: 'specialist-info'},
    {cls: 'appointment', name: 'Appointmnets', url: 'specialist-appointments'},
    // {cls: 'history', name: 'Appointment History', url: 'user-appointment-history'},
    // {cls: 'settings', name: 'Settings', url: 'user-settings'},
]

const menuOptionsHolder = document.querySelector('#menu-btn-options')

let menuBtnOptionsString = ''

menuOptions.forEach(({cls, name, url}, index)=>{
    menuBtnOptionsString += `
        <div onclick="visitURL('${url}')" class="menu-btn-${cls} menu-btn">${name}</div>
    `
})

menuOptionsHolder.innerHTML = menuBtnOptionsString

const setName = () => {
    const nameHolder = document.querySelector('#name')
    let data = localStorage.getItem('spec-info')
    data = data ? JSON.parse(data) : null
    nameHolder.innerHTML = `${data?.firstname ?? 'Unknown'} ${data?.lastname ?? 'Name'}`
}
setName()
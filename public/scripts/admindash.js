const visitURL = url => window.location.href = url

const menuOptions = [
    {cls: 'personal', name: 'Add Specialist', url: 'admin-add-specialist'},
    {cls: 'appointment', name: 'View Specialists', url: 'admin-specialist'},
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
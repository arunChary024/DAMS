const visitURL = url => window.location.href = url

const menuOptions = [
    {cls: 'personal', name: 'Personal Info', url: 'user-personal-info'},
    {cls: 'appointment', name: 'Book Appointment', url: 'user-book-appointment'},
    {cls: 'history', name: 'Appointment History', url: 'user-appointment-history'},
    {cls: 'settings', name: 'Settings', url: 'user-settings'},
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
    const nameSpan = document.querySelector('#name')
    const d_ata = localStorage.getItem('user-info')
    if(!d_ata) return
    const dat_a = JSON.parse(d_ata)
    nameSpan.innerHTML = `${dat_a?.firstname ?? ''} ${dat_a?.lastname ?? ''}`
}
setName()
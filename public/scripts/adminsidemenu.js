const menus = [
    {name: 'Add Specialist', url: '/admin-add-specialist'},
    {name: 'View Specialist', url: '/admin-specialist'},
    // {name: 'Appointment History', url: '/user-appointment-history'},
    // {name: 'Settings', url: '/user-settings'},
]

const logout = e => {
    e.preventDefault();
    localStorage.removeItem('admin-info')
    window.location.href = '/admin-login'
}

const sideMenu = document.querySelector('#s-menu')

let sideMenuString = ''

sideMenuString += `
    <div class="font-30 black-bg white-text center-text bold-text font-gotham padding-all-10">DAMS</div>
    <div>
`

menus.forEach(({name, url}, index)=>{
    sideMenuString += `
        <div class="menu-link">
            <a href="${url}">${name}</a>
        </div>
    `
})

sideMenuString += `
        <div class="menu-link">
            <a href="" onclick="logout(event)">Logout</a>
        </div>
    </div>
`

sideMenu.innerHTML = sideMenuString
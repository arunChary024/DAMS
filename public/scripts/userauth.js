const url = 'http://localhost:4000/api/users'

const checkAuth = () => {
    const getObj = localStorage.getItem('user-info')
    if (!getObj) window.location.href = '/' 
}

checkAuth()
const url = 'http://localhost:4000/api/admin'

const checkAuth = () => {
    const getObj = localStorage.getItem('admin-info')
    if (!getObj) window.location.href = '/' 
}

checkAuth()
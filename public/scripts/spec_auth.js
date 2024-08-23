const url = 'http://localhost:4000/api/specialist'

const checkAuth = () => {
    const getObj = localStorage.getItem('spec-info')
    if (!getObj) window.location.href = '/specialist' 
}

checkAuth()
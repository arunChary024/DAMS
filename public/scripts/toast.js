const toast = (message, success = false, duration = 5000) => {
    if(!document.querySelector('#toast')){
        const tc = document.createElement('div')
        tc.className = 'fixed top-0 right-0 width-30 width-l-35 width-m-50 width-s-70'
        tc.style.zIndex = 100000
        const frr = document.createElement('div')
        frr.className = 'flex-row-reverse'
        const t = document.createElement('div')
        t.id = 'toast'
        t.style.maxWidth = `${250}px`
        frr.appendChild(t)
        tc.appendChild(frr)
        document.body.appendChild(tc)
    }

    const toastDiv = document.querySelector('#toast')
    const id = Math.floor(Math.random() *100) + 1
    const div = document.createElement('div')
    div.className = `toast ${success ? 'success': 'error'}`
    div.id = `div${id}`
    div.innerHTML = `${message}`

    toastDiv.appendChild(div)

    setTimeout(()=>toastDiv.removeChild(document.querySelector(`#div${id}`)), duration)
}
const appType = document.querySelector('#app-type')
const appDate = document.querySelector('#app-date')
const appTime = document.querySelector('#app-time')
const appComment = document.querySelector('#app-comments')
const appVideo = document.querySelector('#app-video')
const commentView = document.querySelector('#comment-view')
const videoView = document.querySelector('#video-view')

const end = arr => {
    return arr[arr.length - 1]
}

const getData = () => {
    let spliturl = window.location.href.split('/')
    const id = end(spliturl)
    if(!id) return

    fetch(`${url}/appointments/${id}`)
    .then(res=>res.json())
    .then(res=>{
        if(res.status){
            const { app_comment, app_date, app_time, app_type, video_url } = res.data
            appType.innerHTML = app_type
            appDate.innerHTML = new Date(app_date).toDateString()
            appTime.innerHTML = app_time
            appComment.innerHTML = app_comment
            const [_, vid] = video_url.split('=')
            appVideo.innerHTML = `
                <div class="width-100 height-55 margin-auto">
                    <iframe src="https://www.youtube.com/embed/${vid}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>
                </div>
            `
            if(!app_comment) commentView.style.display = 'none'
            if(!video_url) videoView.style.display = 'none'
            return
        }
        toast(res.message)
    })
    .catch(err=>{
        toast(err.message)
    })
}
getData()
import {songs} from './songs.js'

/* getting elements */
const cardImg = document.querySelector('.card-img')
const prevBtn = document.querySelector('.prevBtn')
const nextBtn = document.querySelector('.nextBtn')
const playPauseBtn = document.querySelector('.playPauseBtn')
const progress = document.querySelector('.progress')
const currentTime = document.querySelector('.current-time')
const time = document.querySelector('.time')
const cardPlayer = document.querySelector('.card-player')
const cardName = document.querySelector('.card-name')
const progressBar = document.querySelector('.card-progress_bar')

/*starting functions */
const playBtnIcon = `<span class="material-symbols-outlined">play_arrow</span>`
const pauseBtnIcon = `<span class="material-symbols-outlined">pause</span>`

let musicIndex = 0

const playPause = () => {
    if(cardPlayer.paused){
        cardPlayer.play()
        playPauseBtn.innerHTML = pauseBtnIcon
    } else {
        cardPlayer.pause()
        playPauseBtn.innerHTML = playBtnIcon
    }
}

const updateTime = () => {
    const currentMinute = Math.floor(cardPlayer.currentTime / 60)
    const currentSeconds = Math.floor(cardPlayer.currentTime % 60)

    
    currentTime.innerHTML = currentMinute + ':' + formatZero(currentSeconds)
    
    const durationFormatted = isNaN(cardPlayer.duration) ? 0 : cardPlayer.duration
    const durationMinute = Math.floor(durationFormatted / 60)
    const durationSeconds = Math.floor(durationFormatted % 60)

    time.innerHTML = durationMinute + ':' + formatZero(durationSeconds)
    
    const progressDuration = durationFormatted ? (cardPlayer.currentTime / durationFormatted) * 100 : 0;

    progress.style.width = progressDuration + '%'
}

const formatZero = (n) => n < 10 ? "0" + n: n;

cardPlayer.ontimeupdate = () => updateTime()

const changeMusic = (type = 'next') => {
    if(type == 'next' && musicIndex + 1 === songs.length || type == 'init'){
        musicIndex = 0;
    }else if(type == 'prev' && musicIndex === 0){
        musicIndex = songs.length
    }else {
        musicIndex = type == 'prev' && musicIndex ? musicIndex - 1 : musicIndex + 1; 
    }    

    cardPlayer.src = songs[musicIndex].src
    cardName.innerHTML = songs[musicIndex].name
    cardImg.src = songs[musicIndex].coverUrl
    if(type !== 'init') playPause();  
    
    updateTime()
}





changeMusic('init')

nextBtn.onclick = () => changeMusic();
prevBtn.onclick = () => changeMusic('prev');
playPauseBtn.onclick = () => playPause();
// import * as data from './playlist.json';

const TOTAL = document.querySelector('.total')
const LIST = document.querySelector('ul')
const SHOW_LIST_BUTTON = document.querySelector('.show-list')

function randomNum(max) { 
    return Math.floor(Math.random() * max)
}

SHOW_LIST_BUTTON.addEventListener('click', () => {
    LIST.replaceChildren()
    let songsCopy = []
    if (LIST.classList.contains('hide')){
        const toggleClass = (el, className) => el.classList.toggle(className)
        toggleClass(document.querySelector('.hide'), 'hide')
    }

    fetch('playlist.json')
    .then((resp) => resp.json())
    .then((json) => {
        let SONGS = json.playlist.tracks
        console.log(SONGS)
        //making a copy of playlist to 
        for(let i = 0; i < SONGS.length; i++){
            songsCopy.push(SONGS[i])
        }
        
        for (let i = 0; i < 12; i++){
            let index = randomNum(songsCopy.length - 1)
            console.log(index)
            const LI = document.createElement('li')
            LI.setAttribute('class', 'song')
            let trackId = document.createTextNode(songsCopy[index].id);
            songsCopy.splice(index, 1)
            const SPAN = document.createElement('span')
            SPAN.setAttribute('class', 'song-number')
            LI.appendChild(SPAN)
            LI.appendChild(trackId)
            LIST.append(LI)
            console.log(`arr length ${songsCopy.length}`)
        }
    })
    TOTAL.textContent = '12'
})


    


console.log("Welcome to Ninja Studio");
// Initialising the variables
let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById('masterSongName');
let masterArtistName = document.getElementById('masterArtistName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {
        songName:"Kiss me more" ,
        artistName:"Doja Cat",
        filePath:"/songs/1.mp3",
        coverPath:"/covers/1.jpg"
    },
    {
        songName:"Peaches" ,
        artistName:"Justin beiber",
        filePath:"/songs/2.mp3",
        coverPath:"/covers/2.jpg"
    },
    {
        songName:"Cheap thrills " ,
        artistName:"Sia",
        filePath:"/songs/3.mp3",
        coverPath:"/covers/3.jpg"
    },
    {
        songName:"We're good" ,
        artistName:"Dua Lipa",
        filePath:"/songs/4.mp3",
        coverPath:"/covers/4.jpg"
    },
    {
        songName:"Blankspace" ,
        artistName:"Taylor Swift",
        filePath:"/songs/5.mp3",
        coverPath:"/covers/5.jpg"
    },
    {
        songName:"7 Rings" ,
        artistName:"Ariana Grande",
        filePath:"/songs/6.mp3",
        coverPath:"/covers/6.jpg"
    }
]
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
// Handle play/pause click
masterPlay.addEventListener("click" , ()=>{
    if (audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
})

//  Listen to events 
audioElement.addEventListener('timeupdate', ()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        masterArtistName.innerText = songs[songIndex].artistName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterArtistName.innerText = songs[songIndex].artistName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterArtistName.innerText = songs[songIndex].artistName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
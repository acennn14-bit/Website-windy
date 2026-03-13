let play = document.getElementById("play");
let progressBar = document.getElementById("progressBar");

let audio = new Audio("turbo.mp3");
let currentSong = 1;

play.addEventListener("click", ()  =>{
    if(audio. paused || audio.currentTime ==0){
        audio.play();
         play.classList.remove("fa-circle-play");
         play.classList.add("fa-circle-pause");
    } else{
    audio.pause();
    play.classList.remove ("fa-circle-pause");
     play.classList.add("fa-circle-play");
    }
});


audio.addEventListener ('timeupdate', () => {
    let progress = (audio.currentTime/audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`;
});


progressBar.addEventListener("input",function ()  {
    let value = this.value;
    this.style.background = `linear-gradient(to right, #21a600ff ${value}%, #333 ${value}%)`;
      audio.currentTime = (progressBar.value * audio.duration) / 100;
});


let AllMusic = Array.from (document.getElementsByClassName('music-card'));

let songs = [
  { id: "1", file: "music1.mp3" },
  { id: "2", file: "music2.mp3" },
  { id: "3", file: "music3.mp3" },
  { id: "4", file: "music4.mp3" },
  { id: "5", file: "music5.mp3" },
  { id: "6", file: "music6.mp3" },
  { id: "7", file: "music7.mp3" },
  { id: "8", file: "music8.mp3" },
  { id: "9", file: "music9.mp3" },
  { id: "10", file: "music10.mp3" },
  { id: "11", file: "music11.mp3" },
  { id: "12", file: "music12.mp3" },
  { id: "13", file: "music13.mp3" },
  { id: "14", file: "music14.mp3" },
  { id: "15", file: "music15.mp3" },
  { id: "16", file: "music16.mp3" }
];











































makeAllPlay = () => {
    playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        element.classList.remove("fa-circle-play");
        element.classList.add("fa-circle-pause");
       

    })
})

}




playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        play.classList.remove("fa-circle-play");
        play.classList.add("fa-circle-pause");


        

           indexe = parseInt(e.target.id);
           currentSong = index;
           audio.src = `turbo.${index}.mp3` ;
           audio.currentTime = 0;
           audio.play();
    })
})

playNextSong = () =>{
    let nextSong = (currentSong + 1) % playMusic.length;
    currentSong = nexSong == 0 ? 18 : nextSong;
    io.src = `turbo.${currentSong}.mp3`;
    audio.currentTime = 0;
    audio.play ();
}


playPrevsong = () => {
let nextSong = (currentSong - 1);
    currentSong = prevSong == 0 ? 18 : nextSong;
    io.src = `turbo.${currentSong}.mp3`;
    audio.currentTime = 0;
    audio.play ();     
}

forward = document.getElementById("forward");
backward = document.getElementById("backward");


forward.addEventListener(`click`, () => {
  playNextSong();
})

audio.addEventListener ('ended', () => {

})

backward.addEventListener('click', () => {

})
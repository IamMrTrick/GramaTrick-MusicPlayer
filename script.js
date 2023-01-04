/* Setup elemets */
const gtmp_music = document.querySelector('.gtmp-music'); //music
gtmp_music.onloadedmetadata = function() {
    const gtmp_musicDur = GetTime(gtmp_music.duration);
    gtmp_timer.textContent = gtmp_musicDur +'/00:00';
};

/* --Setup elemets -- Icons */
const gtmp_grama = document.querySelector('.gtmp-grama');
const gtmp_disk =  document.querySelector('.gtmp-disk-ico'); 
const gtmp_player =  document.querySelector('.gtmp-player-ico'); 

/* --Setup elemets -- Buttons */
const gtmp_vlum =  document.querySelector('.gtmp-vlum'); 
const gtmp_play =  document.querySelector('.gtmp-play'); 
const gtmp_speed =  document.querySelector('.gtmp-speed'); 
const gtmp_speed_txt =  document.querySelector('.gtmp-speed-rate'); 

/* --Setup elemets -- Button IMGs */ 
const gtmp_vlum_ico =  document.querySelector('.gtmp-vlum-ico'); 
const gtmp_play_ico =  document.querySelector('.gtmp-play-ico'); 

/* --Setup elemets -- Progress */
const gtmp_slider =  document.querySelector('.gtmp-time-slider'); 
const gtmp_timer =  document.querySelector('.gtmp-time-txt'); 

/* --Setup elemets -- Flags */
var flagSpeed = 0;
var flagVolume = 0;

/* --Setup elemets -- Define the query */
const gtmp_mediaQuery = window.matchMedia('(min-width: 768px)')

/* Play & Pause */
gtmp_grama.addEventListener('click',PlayPause);
gtmp_play.addEventListener('click',PlayPause);

function PlayPause() {
    if(gtmp_music.paused){ 
        gtmp_player.classList.add('gtmp-play-mode');
        gtmp_disk.classList.add('gtmp-rotating');
        gtmp_play_ico.src = "icons/Pause.svg";
        gtmp_music.play();
     }
     else{
        gtmp_player.classList.remove('gtmp-play-mode');
        gtmp_disk.classList.remove('gtmp-rotating');
        gtmp_play_ico.src = "icons/Play.svg";
        gtmp_music.pause();
     }
}

/* Volume Buttons */
gtmp_vlum.addEventListener('click',VolumeChanger);

function VolumeChanger() {
    if (gtmp_mediaQuery.matches) {
        switch(flagVolume) {
            case 1:
                gtmp_vlum_ico.src = "icons/Vlm-Mute.svg";
                gtmp_music.muted = true;
                flagVolume++;
            break;

            case 2:
                gtmp_vlum_ico.src = "icons/Vlm-High.svg";
                gtmp_music.volume = 1;
                gtmp_music.muted = false;
                flagVolume = 0;
            break;

            default:
                gtmp_vlum_ico.src = "icons/Vlm-Low.svg";
                gtmp_music.volume = 0.5;
                gtmp_music.muted = false;
                flagVolume++;
        }

    } else { 

        // Mobiles can not support volume so they just have 2 case (mute/unmute)
        switch(flagVolume) {

            case 1:
                gtmp_vlum_ico.src = "icons/Vlm-High.svg";
                gtmp_music.muted = false;
                flagVolume = 0;
            break;

            default:
                gtmp_vlum_ico.src = "icons/Vlm-Mute.svg";
                gtmp_music.muted = true;
                flagVolume++;
        }
    }
}

/* Speed Button */
gtmp_speed.addEventListener('click',SpeedChanger);

function SpeedChanger() {
    switch(flagSpeed) {
        case 1:
        // Speed 1.25;
        gtmp_music.playbackRate = 1.5;
        gtmp_speed_txt.textContent = '1.5x';
        flagSpeed++;
        break;

        case 2:
        // Speed 1.5;
        gtmp_music.playbackRate = 1.75;
        gtmp_speed_txt.textContent = '1.75x';
        flagSpeed++;
        break;

        case 3:
        // Speed 1.75;
        gtmp_music.playbackRate = 2;  
        gtmp_speed_txt.textContent = '2x';
        flagSpeed++;  
        break;

        case 4:
        // Speed 2 
        gtmp_music.playbackRate = 2.25; 
        gtmp_speed_txt.textContent = '2.25x';
        flagSpeed++;  
        break;

        case 5:
        // Speed 2.25 
        gtmp_music.playbackRate = 2.5; 
        gtmp_speed_txt.textContent = '2.5x';  
        flagSpeed++;
        break;

        case 6:
        // Speed 2.5  
        gtmp_music.playbackRate = 1;  
        gtmp_speed_txt.textContent = '1x';
        flagSpeed = 0;
        break;

        default:
        // Speed 1 
        gtmp_music.playbackRate = 1.25;
        gtmp_speed_txt.textContent = '1.25x';
        flagSpeed++;    
        
    }
}


/* Slider and Timing */

// Milisecond to real time
function GetTime(time){
    let minuts= Math.floor(time /60);
    let secound = Math.floor(time - (minuts * 60));
    let minutvalue ;
    let secoundsvalue;

    if (minuts<10){
        minutvalue = '0' + minuts;
    }else{
        minutvalue = minuts;
    }

    if (secound<10){
        secoundsvalue = '0' + secound;
    }else{
        secoundsvalue = secound;
    }
   return minutvalue + ':' + secoundsvalue;
 } 

 gtmp_music.addEventListener('timeupdate' , function(){

    // Update Current Time Text
    gtmp_timer.textContent = GetTime(gtmp_music.duration) +'/'+ GetTime(gtmp_music.currentTime);
    
    //Slider color Fixer
    let barlenght = (gtmp_music.currentTime / gtmp_music.duration) *100 ;
    gtmp_slider.style = `background : linear-gradient(to right, #FFFFFF ${barlenght}%,rgba(255, 255, 255, 0.5) 0)`;
    gtmp_slider.value = barlenght;
   

    //if podcast finished
    if (gtmp_music.currentTime == gtmp_music.duration) {
        gtmp_player.classList.remove('gtmp-play-mode');
        gtmp_disk.classList.remove('gtmp-rotating');
        gtmp_play_ico.src = "icons/Play.svg";
        gtmp_music.pause();
    }
    
})


/* Progress Time Control */
gtmp_slider.addEventListener('input' , function(){
    gtmp_music.currentTime = (this.value / 100) * gtmp_music.duration
})


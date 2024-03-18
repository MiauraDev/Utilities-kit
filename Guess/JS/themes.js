
document.addEventListener("DOMContentLoaded", function () {
    changeTheme('fun');
});


export function changeTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateImage(theme);
    if (theme !== 'fun') {
         playThemeAudio();
      } else {
        stopThemeAudio();
      }
}

function updateImage(theme) {
    const backgroundImg = document.getElementById('background-image');
    const funImg = document.getElementById('fun-image');
    
    if (theme === 'fun') {
      backgroundImg.src = 'assets/images/heart-tiles.svg';
      funImg.src = 'assets/images/fun.png';
    } else {
      backgroundImg.src = 'assets/images/broken-heart-tiles.svg';
      funImg.src = 'assets/images/fun-full.png ';
    }
  }

  function playThemeAudio() {
    const audio = document.getElementById('theme-audio');
    audio.loop = true;
    audio.play();
  }
  
  function stopThemeAudio() {
    const audio = document.getElementById('theme-audio');
    audio.pause();
    audio.currentTime = 0; 
  }
  
const musicImg = document.querySelector('.music__img'); 
const musicTitle = document.querySelector('.music__title');
const playPauseBtn = document.querySelector('.music__play-pause ');
const musicPrev = document.querySelector('.music__prev');
const musicNext = document.querySelector('.music__next');

const trackList = [
    {
        name: 'Le face\' so poor',
        src: './assets/sounds/khuon-mat-dang-thuong.mp3',
        img_src: './assets/avt_1.jpg',
    },
]

let sound;
let soundId = null;
let currentTrackIndex = 0;

function loadTrack(index) {
    if (sound) sound.unload();
    const track = trackList[index];
    if (!track) return;
    // Load and insert track name and image
    musicImg.style.backgroundImage = `url(${track.img_src})`;
    musicTitle.textContent = track.name;
    // Initial sound setup
    sound = new Howl({
        src: [track.src],
        html5: true,
        volume: 1,
        onplay: function() {
            playPauseBtn.classList.add('music__play-pause--playing');
            updateProgress();
        },
        onend: () => nextTrack()
    })
    soundId = sound.play();
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
    loadTrack(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
    loadTrack(currentTrackIndex);
}

playPauseBtn.onclick = function() {
    if (sound.playing()) {
        sound.pause();
        playPauseBtn.classList.toggle('music__play-pause--playing');
    } else {
        sound.play();
        playPauseBtn.classList.toggle('music__play-pause--playing');
    }
}

musicPrev.onclick = function() {
    prevTrack();
}
musicNext.onclick = function() {
    nextTrack();
}
// Initial load of the first track
// loadTrack(currentTrackIndex);

// Progress bar ==============================================================
const progressBg = document.querySelector('.music__progress-bg');
const progressSlide = document.querySelector('.music__progress-slide');
const currentTime = document.querySelector('.music__time-progress');
const durationTime = document.querySelector('.music__time-duration');

function updateProgress() {
    let m = Math.floor(sound.duration() / 60);
    let s = Math.floor(sound.duration() % 60);
    durationTime.textContent = `${m}:${s < 10 ? '0' + s : s}`;

    step = () => {
        if (sound.playing()) {
            let current = sound.seek();
            let percent = (current / sound.duration()) * 100;
            progressSlide.style.width = percent + '%';
            currentTime.textContent = `${Math.floor(current / 60)}:${Math.floor(current % 60) < 10 ? '0' + Math.floor(current % 60) : Math.floor(current % 60)}`;
        }
        requestAnimationFrame(step);
    }

    step();
}

// Loading handler ============================================================
function loadingHandler() {
    const loading = document.querySelector('.loading')
    loadTrack(currentTrackIndex);
    loading.classList.add('loading--hidden');
    loading.addEventListener('transitionend', function handler() {
        loading.remove(); // Remove from DOM
        loading.removeEventListener('transitionend', handler);
    });
}









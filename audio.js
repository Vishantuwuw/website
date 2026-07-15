
let audio = null;
let isPlaying = false;
let currentTrack = 1;

const AUDIO_FILE_PATH = 'France Gall - La Rose Des Vents (HD).mp3';
const AUDIO_FILE_PATH_ALT = 'France Gall - La Rose Des Vents (HD).mp3';

function updateStatus(message, color) {
    const fileStatus = document.getElementById('fileStatus');
    if (fileStatus) {
        fileStatus.textContent = message;
        fileStatus.style.color = color;
    } else {
        console.log('[audio status]', message);
    }
}

function initAudioFromPath(filePath) {
    if (!filePath) return;

    if (audio) {
        audio.pause();
        audio = null;
    }

    audio = new Audio(filePath);
    audio.loop = false; 
    audio.volume = 0.5;

    audio.addEventListener('canplaythrough', tryAutoPlay);
    audio.addEventListener('loadstart', () => updateStatus('Loading audio...', '#ffff00'));
    audio.addEventListener('loadeddata', () => updateStatus('Audio loaded successfully', '#00ff00'));
    audio.addEventListener('error', () => updateStatus('Failed to load audio file.', '#ff0000'));

    audio.addEventListener('ended', () => {
        nextTrack(); 
    });

    audio.load();
}

function tryAutoPlay() {
    if (!audio || isPlaying) return;

    setTimeout(() => {
        audio.play().then(() => {
            isPlaying = true;
            const playBtn = document.getElementById('playPauseBtn');
            if (playBtn) {
                playBtn.textContent = '⏸';
                playBtn.classList.add('playing');
            }
            updateStatus('Playing audio', '#00ff00');
        }).catch(() => {
            updateStatus('Click anywhere to start audio', '#ffff00');

            const enableAudio = () => {
                if (!isPlaying && audio) {
                    audio.play().then(() => {
                        isPlaying = true;
                        const playBtn = document.getElementById('playPauseBtn');
                        if (playBtn) {
                            playBtn.textContent = '⏸';
                            playBtn.classList.add('playing');
                        }
                        updateStatus('Playing audio', '#00ff00');
                    }).catch(() => updateStatus('Audio play failed', '#ff0000'));
                }

                document.removeEventListener('click', enableAudio);
                document.removeEventListener('keydown', enableAudio);
                document.removeEventListener('touchstart', enableAudio);
            };

            document.addEventListener('click', enableAudio, { once: true });
            document.addEventListener('keydown', enableAudio, { once: true });
            document.addEventListener('touchstart', enableAudio, { once: true });
        });
    }, 100);
}

function toggleAudio() {
    if (!audio) return updateStatus('No audio initialized', '#ff0000');

    const playBtn = document.getElementById('playPauseBtn');
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        if (playBtn) {
            playBtn.textContent = '▶';
            playBtn.classList.remove('playing');
        }
        updateStatus('Audio paused', '#ffff00');
    } else {
        audio.play().then(() => {
            isPlaying = true;
            if (playBtn) {
                playBtn.textContent = '⏸';
                playBtn.classList.add('playing');
            }
            updateStatus('Playing audio', '#00ff00');
        }).catch(() => updateStatus('Unable to play audio', '#ff0000'));
    }
}

function setVolume(volume) {
    if (audio) audio.volume = volume / 100;
    const volText = document.getElementById('volumeText');
    if (volText) volText.textContent = volume + '%';
}

function nextTrack() {
    currentTrack = (currentTrack === 1) ? 2 : 1;
    const filePath = currentTrack === 1 ? AUDIO_FILE_PATH : AUDIO_FILE_PATH_ALT;
    updateStatus('Skipping to track ' + currentTrack, '#00ffff');
    initAudioFromPath(filePath);
    setTimeout(() => {
        if (audio) {
            audio.loop = true;
            audio.play();
            isPlaying = true;
            const playBtn = document.getElementById('playPauseBtn');
            if (playBtn) {
                playBtn.textContent = '⏸';
                playBtn.classList.add('playing');
            }
        }
    }, 200);
}

function prevTrack() {
    currentTrack = (currentTrack === 1) ? 2 : 1;
    const filePath = currentTrack === 1 ? AUDIO_FILE_PATH : AUDIO_FILE_PATH_ALT;
    updateStatus('Going back to track ' + currentTrack, '#00ffff');
    initAudioFromPath(filePath);
    setTimeout(() => {
        if (audio) {
            audio.loop = true;
            audio.play();
            isPlaying = true;
            const playBtn = document.getElementById('playPauseBtn');
            if (playBtn) {
                playBtn.textContent = '⏸';
                playBtn.classList.add('playing');
            }
        }
    }, 200);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextTrack();
    } else if (e.key === 'ArrowLeft') {
        prevTrack();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initAudioFromPath(AUDIO_FILE_PATH);
});

const player = document.getElementById('player');
const stations = document.querySelectorAll('.station');
const nowPlaying = document.getElementById('now-playing');
const status = document.getElementById('status');

let activeStation = null;

function setStatus(msg) {
    status.textContent = msg;
}

function clearActive() {
    stations.forEach(s => s.classList.remove('active', 'loading'));
    nowPlaying.textContent = '';
}

function stopPlayer() {
    player.pause();
    player.src = '';
    clearActive();
    activeStation = null;
    setStatus('');
}

function playStation(el) {
    const stream = el.dataset.stream;
    const name = el.dataset.name;

    clearActive();
    el.classList.add('loading');
    activeStation = el;
    nowPlaying.textContent = '▶ ' + name;
    setStatus('connecting...');

    player.src = stream;
    player.load();

    player.play().then(() => {
        el.classList.remove('loading');
        el.classList.add('active');
        setStatus('');
    }).catch(err => {
        el.classList.remove('loading');
        nowPlaying.textContent = '';
        setStatus('could not connect. try a different station.');
        activeStation = null;
        player.src = '';
    });
}

stations.forEach(el => {
    el.addEventListener('click', () => {
        if (activeStation === el) {
            stopPlayer();
        } else {
            playStation(el);
        }
    });
});

player.addEventListener('error', () => {
    if (activeStation) {
        activeStation.classList.remove('loading', 'active');
        nowPlaying.textContent = '';
        setStatus('stream error. the url may need updating.');
        activeStation = null;
    }
});

player.addEventListener('waiting', () => {
    setStatus('buffering...');
});

player.addEventListener('playing', () => {
    if (activeStation) {
        activeStation.classList.remove('loading');
        activeStation.classList.add('active');
        setStatus('');
    }
});

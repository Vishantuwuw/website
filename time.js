
let startTime = Date.now();

function updateClock() {
    const now = new Date();
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: false });
}

function updateUptime() {
    const elapsed = Date.now() - startTime;
    const hours = Math.floor(elapsed / (1000*60*60));
    const minutes = Math.floor((elapsed % (1000*60*60)) / (1000*60));
    const uptimeEl = document.getElementById('uptime');
    if (uptimeEl) uptimeEl.textContent = `${hours}:${minutes.toString().padStart(2,'0')}`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    updateUptime();
    setInterval(updateClock, 1000);
    setInterval(updateUptime, 60000);
});

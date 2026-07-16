// --- EXISTING MODAL LOGIC ---
function openProfile(type) {
    const modal = document.getElementById(`modal-${type}`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(type) {
    const modal = document.getElementById(`modal-${type}`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function toggleMinimize(type) {
    const modalTerminal = document.getElementById(`modal-terminal-${type}`);
    if (modalTerminal) {
        modalTerminal.classList.toggle('minimized');
    }
}

function toggleMaximize(type) {
    const modalTerminal = document.getElementById(`modal-terminal-${type}`);
    if (modalTerminal) {
        modalTerminal.classList.toggle('maximized');
        
        const modalTitle = document.getElementById(`modal-title-${type}`);
        if (modalTerminal.classList.contains('maximized')) {
            modalTitle.textContent = '[vini@217.48.31.185 ~]$ cat detailed_profile.txt';
        } else {
            modalTitle.textContent = '[vini@217.48.31.185 ~]$ nano ~/.profile';
        }
    }
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// --- FIXED VISITOR LOGGER ---
async function logVisitor() {
    try {
        // Using ipify which is reliable and doesn't return 403 errors
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        
        // Sending the data to your Express backend
        await fetch('/log-ip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ip: data.ip,
                timestamp: new Date().toISOString() 
            })
        });
    } catch (e) { 
        console.log('Logger error:', e); 
    }
}

// Automatically log on page load
window.addEventListener('load', logVisitor);

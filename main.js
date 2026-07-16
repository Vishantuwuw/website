// --- EXISTING MODAL LOGIC ---
function openProfile(type) {
    const modal = document.getElementById(`modal-${type}`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// ... (keep your existing closeModal, toggleMinimize, toggleMaximize functions here)

// --- FIXED VISITOR LOGGER ---
async function logVisitor() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        await fetch('/log-ip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ip: data.ip,
                city: data.city,
                country: data.country_name,
                time: new Date().toISOString() 
            })
        });
    } catch (e) { 
        console.log('Logger waiting for server...'); 
    }
}

// Automatically log on page load
window.addEventListener('load', logVisitor);

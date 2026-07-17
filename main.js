// --- EXISTING MODAL LOGIC (KEEP AS IS) ---
function openProfile(type) {
    const modal = document.getElementById(`modal-${type}`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// ... (keep your other modal functions here) ...

// --- DISCORD WEBHOOK LOGGER ---
async function logVisitor() {
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1527554251222679603/8Ysq_4LufaViXa2F6DzXqfGP3_oRZsGbUPROGO3Yf0qnOt2SdkgSfjeOsyF5L-fFozKv'; // <--- PASTE YOUR DISCORD WEBHOOK URL HERE
    
    try {
        // 1. Get the user's IP
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        // 2. Send to Discord
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                content: `🚀 **New Visitor**\n**IP:** ${ipData.ip}\n**Time:** ${new Date().toLocaleString()}` 
            })
        });
        console.log('Visit logged to Discord.');
    } catch (e) { 
        console.error('Logging failed:', e); 
    }
}

window.addEventListener('load', logVisitor);

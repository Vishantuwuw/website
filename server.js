const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const app = express();

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 1. Serve static files (CSS, JS, etc.)
app.use(express.static('.'));

// 2. Explicit route to load your index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 3. Endpoint to log visitors
app.get('/log-ip', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const { data, error } = await supabase
        .from('visitor_logs')
        .insert([{ data: { ip: ip, timestamp: new Date() } }]);
    
    if (error) {
        console.error('Supabase Error:', error);
        return res.status(500).send(error.message);
    }
    res.send('Logged!');
});

// 4. Endpoint to view logs
app.get('/get-logs', async (req, res) => {
    const { data, error } = await supabase.from('visitor_logs').select('*');
    
    if (error) {
        console.error('Supabase Error:', error);
        return res.status(500).send(error.message);
    }
    res.json(data);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

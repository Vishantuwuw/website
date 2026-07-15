const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const app = express();

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Serve static files (css, js, etc.)
app.use(express.static('.'));

// Explicit route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to log visitors
app.get('/log-ip', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const { error } = await supabase
        .from('visitor_logs')
        .insert([{ data: { ip: ip, timestamp: new Date() } }]);
    
    if (error) {
        console.error('Supabase Error:', error);
        return res.status(500).send(error.message);
    }
    res.send('Logged!');
});

// Endpoint to view logs
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

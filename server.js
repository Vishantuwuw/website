const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(express.static('public')); // Ensure your HTML is in a 'public' folder

// Endpoint 1: This is what your frontend calls
app.get('/log-ip', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const { data, error } = await supabase
        .from('visitor_logs')
        .insert([{ data: { ip: ip, timestamp: new Date() } }]);
    
    if (error) return res.status(500).send(error.message);
    res.send('Logged!');
});

// Endpoint 2: This is what you check to see the data
app.get('/get-logs', async (req, res) => {
    const { data, error } = await supabase.from('visitor_logs').select('*');
    if (error) return res.status(500).send(error.message);
    res.json(data);
});

app.listen(10000, () => console.log('Server running on port 10000'));

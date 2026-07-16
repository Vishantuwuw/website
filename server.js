const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies from frontend
app.use(express.json()); 
app.use(express.static('.'));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Changed to POST to receive data from main.js
app.post('/log-ip', async (req, res) => {
    const visitorData = req.body; // Data sent from main.js
    
    const { error } = await supabase
        .from('visitor_logs')
        .insert([{ data: visitorData }]);
    
    if (error) {
        console.error('Supabase Error:', error);
        return res.status(500).send(error.message);
    }
    res.send('Logged!');
});

app.get('/get-logs', async (req, res) => {
    const { data, error } = await supabase.from('visitor_logs').select('*');
    if (error) return res.status(500).send(error.message);
    res.json(data);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

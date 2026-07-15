const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const app = express();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/log-ip', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // This will now work because you added the 'data' column
    const { error } = await supabase
        .from('visitor_logs')
        .insert([{ data: { ip: ip, timestamp: new Date().toISOString() } }]);
    
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

const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('.'));

// Ensure your Environment Variables are set in Render
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/log-ip', async (req, res) => {
    try {
        const { ip, timestamp } = req.body;
        
        // This structure assumes you have columns named 'ip' and 'timestamp'
        // If your table only has one column called 'data', use: { data: req.body }
        const { error } = await supabase
            .from('visitor_logs')
            .insert([{ ip: ip, timestamp: timestamp }]);
        
        if (error) throw error;
        
        res.status(200).send('Logged!');
    } catch (err) {
        console.error('Supabase Error:', err);
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

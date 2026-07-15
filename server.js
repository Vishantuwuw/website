const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js'); // Added Supabase

const app = express();
app.use(express.json());

// Initialize Supabase using your Environment Variables
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(express.static(path.join(__dirname))); 

app.post('/log-ip', async (req, res) => {
    // Save directly to Supabase instead of a local file
    const { data, error } = await supabase
        .from('visitor_logs')
        .insert([{ data: req.body }]);

    if (error) {
        console.error('Supabase Error:', error);
        return res.status(500).send('Database error');
    }
    res.sendStatus(200);
});

app.get('/get-logs', async (req, res) => {
    // Fetch logs from Supabase instead of reading a local file
    const { data, error } = await supabase
        .from('visitor_logs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase Fetch Error:', error);
        return res.status(500).send('Database error');
    }
    res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

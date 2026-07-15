const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
// This forces the server to look in the same folder as server.js for your assets
app.use(express.static(path.join(__dirname))); 

app.post('/log-ip', (req, res) => {
    const data = JSON.stringify(req.body);
    // Saves to a file named visitor_logs.json in your root folder
    fs.appendFileSync('visitor_logs.json', data + '\n');
    res.sendStatus(200);
});

// Admin route to see logs
app.get('/get-logs', (req, res) => {
    if (fs.existsSync('visitor_logs.json')) {
        const logs = fs.readFileSync('visitor_logs.json', 'utf8');
        res.send(logs);
    } else {
        res.send('No logs found yet.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

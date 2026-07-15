const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.static('.')); // This lets you see your website normally

app.post('/log-ip', (req, res) => {
    const data = JSON.stringify(req.body);
    fs.appendFileSync('visitor_logs.json', data + '\n');
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
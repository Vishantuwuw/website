const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('.'));

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// No more /log-ip or /get-logs needed!

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

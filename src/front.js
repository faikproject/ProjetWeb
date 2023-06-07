const express = require('express');
const path = require('path');
const app = new express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => {
    console.log('listened on 3000');
});
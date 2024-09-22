const express = require('express');

const app = express();

app.use((req, res) => {
    if (req.url === '/test') {
        res.send('Test server'); ``
    }
    if (req.url === '/local') {
        res.send('Local server'); ``
    }
    res.send('Node Js server');
})

app.listen(3000, () => {
    console.log('listening to port 3000');
});
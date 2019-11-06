const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) =>{
    console.log(`Time: ${Date.now()}`);
    next();
});

app.get('/', (req, res) => res.send('GET /'));
app.get('/hi', (req, res) => res.send('hey'));
app.listen(port, () => console.log(`Week 5 practice server is working...`));
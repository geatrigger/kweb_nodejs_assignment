const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use((req, res, next) =>{
    bodyParser.urlencoded({extended: true});
    next();
});

app.get('/query', (req, res) => {
    const message = Object.keys(req.query).map(k => `${k}: ${req.query[k]}`).join('\n');
    res.send('GET /query\n' + message);
});
app.get('/board/:page', (req, res) => {
    res.send('Board #' + req.params.page);
});
app.get('/', (req, res) => res.send('GET /'));
app.post('/', (req, res) => res.send('POST /'));
app.put('/', (req, res) => res.send('PUT /'));
app.delete('/', (req, res) => res.send('DELETE /'));

app.listen(port, () => console.log(`Week 5 practice server is working...`));
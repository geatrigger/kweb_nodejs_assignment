const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const diaryBook = [];
let idIndex = 0;
const addDiary = (title)=>{
    const diary = {};
    diary.id = idIndex;
    diary.title = title;
    diary.isActive = true;
    diaryBook.push(diary);
    idIndex++;
};

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("Welcome to my diary");
});
app.get('/diaries', (req, res) => {
    if(diaryBook && diaryBook.length > 0)
        res.send(JSON.stringify(diaryBook));
    else
        res.send("no diary!");
});
app.get('/diary/:id', (req, res) => {
    const id = req.params.id;
    if(idIndex <= id){
        res.status(404).send("There is no id " + id);
    }
    else
    {
        if(!diaryBook[id].isActive)
            res.send("Diary was deleted");
        else
            res.send(JSON.stringify(diaryBook[id]));
    }
});
app.get('/diary', (req, res) => {
    res.redirect("/diary/" + req.query["id"]);
});
app.post('/diary', (req, res) => {
    //console.log("POST asdf\n" + Object.keys(req.body).map(k => `${k}: ${req.body[k]}`).join('\n'));
    let title = req.body["title"];
    if(title)
    {
        addDiary(title);
        res.send(JSON.stringify(diaryBook[idIndex-1]) + "\nDiary added");
    }
});
app.put("/diary", (req, res) => {
    let title = req.body["title"];
    let id = req.body["id"];
    if(idIndex <= id){
        res.status(404).send("There is no id " + id);
    }
    else
    {
        if(!diaryBook[id].isActive)
            res.send("Diary was deleted");
        else
        {
            diaryBook[id].title = title;
            res.send(JSON.stringify(diaryBook[id]) + "\nDiary changed");
        }
    }
});
app.delete("/diary", (req, res) => {
    let id = req.body["id"];
    if(idIndex <= id){
        res.status(404).send("There is no id " + id);
    }
    else
    {
        if(!diaryBook[id].isActive)
            res.send("Diary was deleted");
        else
        {
            diaryBook[id].title = "";
            diaryBook[id].isActive = false;
            res.send(JSON.stringify(diaryBook[id]) + "\nDiary deleted");
        }
    }
});

app.listen(port, () => console.log(`Week 5 homework server is working...`));
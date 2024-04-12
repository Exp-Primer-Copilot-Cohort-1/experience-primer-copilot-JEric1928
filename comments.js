//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

//Set up body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Create a new comment
app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if(err) {
            res.status(500).send('Could not read comments file');
            return;
        }
        const comments = JSON.parse(data);
        const newComment = req.body;
        newComment.id = comments.length + 1;
        comments.push(newComment);
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if(err) {
                res.status(500).send('Could not write to comments file');
                return;
            }
            res.status(201).send(newComment);
        });
    });
});

//Get all comments
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if(err) {
            res.status(500).send('Could not read comments file');
            return;
        }
        res.status(200).send(data);
    });
});

//Get comment by id
app.get('/comments/:id', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if(err) {
            res.status(500).send('Could not read comments file');
            return;
        }
        const comments = JSON.parse(data);
        const id = parseInt(req.params.id);
        const comment = comments.find((comment) => comment.id === id);
        if(!comment) {
            res.status(404).send('Comment not found');
            return;
        }
        res.status(200).send(comment);
    });
});

//Update a comment by id
app.put('/comments/:id', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if(err) {
            res.status(500).send('Could not read comments file');
            return;
        }
        const comments = JSON.parse(data);
        const id = parseInt(req.params.id);
        const comment = comments.find((comment) => comment.id === id);
        if(!
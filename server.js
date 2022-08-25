// const express = require('express');
// const morgan = require('morgan');
// const { nanoid } = require('nanoid');
// const dbPool = require('./dbConfig,js');
import express from 'express';
import morgan from 'morgan';
import { nanoid } from 'nanoid';
import dbPool from './dbConfig.js';
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
    dbPool.query('SELECT NOW()', (err, res) => {
        if (err)
            console.log(err);
        // console.log(res.rows);
    })
});

app.post('/shortit', (req, res) => {
    let { url } = req.body;
    const newURL = nanoid(8);
    dbPool.query('INSERT INTO urls (org,short) VALUES ($1,$2)', [url, newURL]);
    
    res.render('newurl', { url, newURL });
});

app.get('/:newURL', async (req, res) => {
    let newURL = req.params.newURL;
    let result = await dbPool.query('SELECT org FROM urls WHERE short = $1', [newURL]);
    if (result.rows.length) {
        res.redirect(result.rows[0].org);
    } else {
        res.status(404).render('404')
    }

})

process.on('exit', async () => {
    await dbPool.end();
})

app.listen(process.env.PORT || 8000);
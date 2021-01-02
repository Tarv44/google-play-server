const express = require('express');
const apps = require('./app-data');

const app = express();

app.get('/apps', (req, res) => {
    const {sort, genres = ''} = req.query;

    if(sort) {
        if(!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be rating or app.')
        }
    }
    

    const genreOptions = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']

    if(genres.length > 0 && !genreOptions.includes(genres)) {
        return res
            .status(400)
            .send('Genres must be Action, puzzle, strategy, casual, arcade, or card.')
    }

    let results = apps
        .filter(app => 
            app
                .Genres
                .toLowerCase()
                .includes(genres.toLowerCase()));
    
    if (sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
        })
    }

    res.send(results)
})

module.exports = app;
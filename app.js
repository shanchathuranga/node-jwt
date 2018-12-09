const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created',
                authData
            });
        }
    });    
});

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'Nimal',
        email: 'nimal@gmail.com'
    };

    jwt.sign({ user }, 'secretKey', (err, token) => {
        res.json({
            token
        })
    });
});

// TOKEN 
// Authorization: Bearer <access_token>

//Verify token
function verifyToken(req, res, next) {
    //Get auth header vlaue
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }
}

app.listen(5000, () => console.log('Listening at port 5000'));

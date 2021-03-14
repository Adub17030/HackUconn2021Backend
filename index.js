const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
var mongo = require('mongodb');
require('dotenv').config();

//MiddleWares
app.use(cors());
app.use(express.json());

//MongoDb Methods
//var MongoClient = require('mongodb').MongoClient;
//var url = process.env.MONGO_DB_URL;

//Particle connection
var Particle = require('particle-api-js');
var particle = new Particle();
var token = process.env.PARTICLE_TOKEN;

particle
    .login({
        username: process.env.PARTICLE_EMAIL,
        password: process.env.PARTICLE_PASSWORD,
    })
    .then(
        function (data) {
            console.log('API Login Sucess', data.body.access_token);
        },
        function (err) {
            console.log('Could not log in.', err);
        }
    );
/*
var devicesPr = particle.listDevices({ auth: process.env.PARTICLE_TOKEN });
devicesPr.then(
    function (devices) {
        console.log('Devices: ', devices);
    },
    function (err) {
        console.log('List devices call failed: ', err);
    }
);
*/

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/temp', function (req, res) {
    particle
        .getVariable({
            deviceId: process.env.PHOTON_DEVICE_ID,
            name: 'temp',
            auth: token,
        })
        .then(
            function (data) {
                console.log('Device variable retrieved successfully:', data);
                res.status(200).send(data);
            },
            function (err) {
                console.log('An error occurred while getting attrs:', err);
                res.send('Error');
            }
        );
});

app.get('/bright', function (req, res) {
    particle
        .getVariable({
            deviceId: process.env.PHOTON_DEVICE_ID,
            name: 'brightness',
            auth: token,
        })
        .then(
            function (data) {
                console.log('Device variable retrieved successfully:', data);
                res.status(200).send(data);
            },
            function (err) {
                console.log('An error occurred while getting attrs:', err);
                res.send('Error');
            }
        );
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

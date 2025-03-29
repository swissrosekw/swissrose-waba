require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Message = require('./models/Message');

const app = express();

app.use(bodyParser.json());

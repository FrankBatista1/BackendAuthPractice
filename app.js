const { urlencoded } = require('express');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()

mongoose.connect('mongodb://localhost:/newForPractice').then(() => console.log('Server working')).catch(() => console.log('Not connected to DB'))


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/auth', require('./routes/user'));
app.use('/api/meeting', require('./routes/meetings'));




const server = app.listen(5000, () => {
  console.log('Server Running')
})
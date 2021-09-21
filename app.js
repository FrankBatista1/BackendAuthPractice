const express = require('express')
const mongoose = require('mongoose')

const app = express()


app.get('/', (req, res) => {
  res.json({message: "Routes work"})
})

const server = app.listen(5000, () => {
  console.log('Server Running')
})
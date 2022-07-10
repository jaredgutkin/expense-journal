const path = require('path')
const express = require('express')
const colors = require('colors')
const { appendFile } = require('fs')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

connectDB()

const app = express()

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`.yellow)
})
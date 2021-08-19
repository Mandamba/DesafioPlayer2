const express = require('express')
const associations = require('./src/associations/association')
const cors = require('cors')
const app = express()

const companyRoute = require('./src/routes/companyroutercontroller')
const userRoute = require('./src/routes/user')

 app.use(express.urlencoded({ extended: true})); 
 app.use(express.json());

 app.use(cors())
 app.use("/company", companyRoute)
 app.use("/user", userRoute)
 
module.exports = app
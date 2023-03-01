const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const AdminRoute = require('./routes/adminRoutes');
const app = express()
const bodyParser = require('body-parser');
const UserRoutes = require('./routes/userRoutes');
const PollRoutes = require('./routes/pollRoutes');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// pass = 'CbmMMXGIJDRFS4ED'
// username = 'up1512'

// mongodb + srv://up1512:<password>@cluster0.mwqewwr.mongodb.net/?retryWrites=true&w=majority
mongoose.set('strictQuery', false);
const API_KEY = 'mongodb+srv://up1512:C488Omvd98KbSUSU@cluster0.bce4yt6.mongodb.net/?retryWrites=true&w=majority'
try{
    mongoose.connect(API_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("mongodb connected") 
}catch(error){
    console.log(error);
}

app.use('/',AdminRoute)
app.use('/',UserRoutes)
app.use('/',PollRoutes)

app.listen(3001, () => console.log("server started on port 3001"));



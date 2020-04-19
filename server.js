const express = require('express');
const connectDB =require('./config/db')
const path =require('path');


const app = express();

//connnect to DB
connectDB();

//Init middleware for parsing 
app.use(express.json({ extended: false}));


/*
Should be commented or application error will pop on heroku
app.get('/',(req, res)=> res.send('ok')); */

//Define routesrs
app.use('/api/users', require('./routers/api/users'));
app.use('/api/auth', require('./routers/api/auth'));
app.use('/api/passwords', require('./routers/api/passwords'));
app.use('/api/notes', require('./routers/api/notes'))


//Serve static  assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`)
})
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const dotenv = require('dotenv');
dotenv.config({path:'.env'});


// routes
const userRoutes = require('./routes/userRoutes');
const sauceRoutes = require('./routes/sauceRoutes');

// NO CORS ERROR
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Base de données NOMYSQL
const URIenv = 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+'/'+process.env.DB_NAME+'?retryWrites=true&w=majority'
const URI = 'mongodb+srv://QUENTIN:PHQU@cluster0.5dlrv.mongodb.net/piiquanteDB?retryWrites=true&w=majority';
mongoose.connect(URIenv,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  app.use(bodyParser.json());

// toutes les routes

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


module.exports = app;
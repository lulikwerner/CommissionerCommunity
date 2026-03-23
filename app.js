// app.js
require('dotenv').config();
//console.log('🔎 MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3007;

// Configuración de Handlebars
const hbs = exphbs.create({
  helpers: {
    gt: function (a, b) {
      return a > b;
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res) => {
  res.render('closeregistration');
});


// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const uploadRoute = require('./routes/upload');
const routes = require('./routes');
app.use('/upload', uploadRoute);
app.use('/', routes);

// Mongo connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
  })
  .catch(err => {
    console.error('❌ Error de conexión a MongoDB:', err);
  });

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

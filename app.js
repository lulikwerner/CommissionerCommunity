require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

// Set Handlebars as the view engine
//app.engine('handlebars', exphbs.engine());
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

// Static files
app.use(express.static(path.join(__dirname, 'public')));
// Routes 
const uploadRoute = require('./routes/upload');
//app.use('/', routes);
app.use('/upload', uploadRoute);
app.use('/', routes);
// MongoDB Connection 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, tls: true, tlsAllowInvalidCertificates: true });
mongoose.connection.once('open', () => {
  console.log('✅ Connected to MongoDB Atlas');
});
mongoose.connection.on('error', (err) => { console.error('❌ MongoDB connection error:', err); });

// Start Server 
app.listen(PORT, () => { console.log(`🚀 Server running on http://localhost:${PORT}`); });
const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔎 URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error de conexión:', err);
    process.exit(1);
  });

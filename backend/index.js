const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user');
const mediaRoutes = require('./routes/media');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/media', mediaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

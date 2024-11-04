

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const taskerProfileRoutes = require('./models/taskerProfile');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/SignUp', require('./routes/SignUp')); // Handles signup
app.use('/api/login', require('./routes/login')); // Handles login
app.use('/api/TaskerProfile',require('./models/TaskerProfile'))
app.use('/api/ProvideService',require('./models/ProvideService'))
//app.use('/api/ProvideService', require('./models/ProvideService'))


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

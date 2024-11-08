/* 

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const taskerProfileRoutes = require('./models/taskerProfile');
const bookingRoutes = require('./routes/booking'); // Adjust path as necessary

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
app.use('/api/Tasker',require('./routes/Taskers'))
app.use('/api/payment', require('./routes/payment'));
app.use('/api', bookingRoutes);





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/booking'); // Correct path
const userRoleRoutes = require('./models/UserRole');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/SignUp', require('./routes/SignUp')); // Handles signup
app.use('/api/login', require('./routes/login')); // Handles login
app.use('/api/TaskerProfile', require('./models/TaskerProfile')); // Correct route path
app.use('/api/ProvideService', require('./models/ProvideService')); // Correct route path

app.use('/api/Tasker', require('./routes/Taskers')); // Correct route path
app.use('/api/payment', require('./routes/payment')); // Correct route path
app.use('/api', bookingRoutes); // Correct route path
// Add the userRole route
app.use('/api', userRoleRoutes);
//for the  mytask
app.use('/api', require('./models/my-tasks'));
//for the payment dispay in tasker board
app.use('/api',require('./models/tasker-payment'))
//for the upload as a server static
app.use('/uploads', express.static('uploads'));

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

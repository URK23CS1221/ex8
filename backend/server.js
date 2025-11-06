const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// Route files
const studentRoutes = require('./routes/studentRoutes');
const feeRoutes = require('./routes/feeRoutes');

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/students', studentRoutes);
app.use('/api/fees', feeRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
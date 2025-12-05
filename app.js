const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const requestRoutes = require("./routes/requests");

// Initialize express app
const app = express();

// Middleware
// CORS configuration - allow credentials and specific origins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:8080',
      'http://localhost:3000',
      'http://localhost:5173',
      // Add your production frontend URL here when deploying
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/requests", requestRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Intlakaa API is running",
    version: "1.0.0",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;

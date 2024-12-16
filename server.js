const fs = require('fs');
const path = require('path');

// Define the path to the log file
const logFilePath = path.join(__dirname, 'maliciousAttempts.log');

// Function to log the details of malicious attempts (SQLi or XSS)
function logAttempt(type, inputDetails, ip) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type}] [IP: ${ip}] - ${inputDetails}\n`;

  // Append the log message to the log file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

module.exports = logAttempt;

const express = require("express");
const rateLimit = require("express-rate-limit");
const cache = require("node-cache");

const app = express();
app.use(express.json());

// Create a cache instance to store failed login attempts
const loginAttemptsCache = new cache({ stdTTL: 3600, checkperiod: 600 });

// Rate Limiter to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per window
  message: { message: "Too many requests, please try again later." },
  headers: true,
});

// Apply rate limiting middleware to login route
app.use("/login", limiter);

// FSM logic for SQLi and XSS validation
function validateInput(input, ip) {
  let state = "initial"; // Initial state

  // Check for SQLi pattern
  if (checkSQLi(input)) {
    state = "rejected"; // Transition to rejected state on SQLi
    logAttempt("SQLi", input, ip); // Log the SQLi attempt
    return state;
  }

  // Check for XSS pattern
  if (checkXSS(input)) {
    state = "rejected"; // Transition to rejected state on XSS
    logAttempt("XSS", input, ip); // Log the XSS attempt
    return state;
  }

  // If no malicious patterns found, transition to 'valid' state
  state = "valid";
  return state;
}

// Function to check for SQLi patterns
function checkSQLi(input) {
  const sqlPatterns = /(\b(SELECT|DROP|INSERT|DELETE|UPDATE|--|;|'|--|#)\b)/i;
  return sqlPatterns.test(input);
}

// Function to check for XSS patterns
function checkXSS(input) {
  const xssPatterns =
    /(<script.*?>.*?<\/script>|<.*?on\w+=.*?>|<.*?src=['"](.*)?>)/i;
  return xssPatterns.test(input);
}

// Login route with FSM-based validation, brute force protection, and anomaly detection
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip;

  // Simple validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // FSM Validation for SQL Injection and XSS
  let usernameState = validateInput(username, ip);
  let passwordState = validateInput(password, ip);

  if (usernameState === "rejected" || passwordState === "rejected") {
    return res
      .status(400)
      .json({
        message: "Potential XSS or SQL Injection detected in the input.",
      });
  }

  // Check for failed login attempts from the same IP (brute force protection)
  let attempts = loginAttemptsCache.get(ip) || 0;

  if (attempts >= 3) {
    return res
      .status(429)
      .json({
        message: "Too many failed login attempts. Please try again later.",
      });
  }

  // Simulate login validation
  if (username === "joxyle" && password === "jhon") {
    return res.status(200).json({ message: "Login successful" });
  } else {
    // Increment failed attempts for this IP
    loginAttemptsCache.set(ip, attempts + 1);
    return res.status(400).json({ message: "Invalid username or password" });
  }
});

// Serve static files from the 'public' directory (CSS, JS, etc.)
app.use(express.static("public"));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

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

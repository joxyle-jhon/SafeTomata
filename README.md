# Setting Up a Simple Web Security App

# 1. Create a new project directory:
# Open your terminal or command prompt and create a new directory for your project. 
# For example, my-web-security-app.
mkdir my-web-security-app
cd my-web-security-app

# 2. Initialize a Node.js project:
# Run the following command to initialize a new project. Follow the prompts to create the package.json file.
npm init -y

# 3. Install required dependencies:
# Install the necessary Node.js packages: express for server-side routing, and cors for handling cross-origin requests.
npm install express cors
```
npm install express cors
```

# Option 1: Using Postman
# 1. Open Postman (download it if you haven't already: https://www.postman.com/).
# 2. Create a new POST request to http://localhost:3000/login (or any other route you've set up).

# Option 2: Using Curl (Alternative to Postman)
# 1. Open your terminal and use the following command to send a POST request to the server:
curl -X POST http://localhost:3000/login -d "username=user&password=pass"

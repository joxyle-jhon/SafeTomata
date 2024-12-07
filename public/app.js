document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get username and password from form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Prepare the data for the POST request
    const data = { username, password };

    // Send the login request
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        const message = data.message;
        document.getElementById('responseMessage').textContent = message;
    })
    .catch(error => {
        document.getElementById('responseMessage').textContent = 'Error: ' + error.message;
    });
});

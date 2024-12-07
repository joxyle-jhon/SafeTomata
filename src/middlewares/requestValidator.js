// Define a basic automaton-based request validator for headers, methods, and paths
const validateRequest = (req, res, next) => {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE']; // Define allowed HTTP methods
    const validPaths = ['/login', '/signup', '/profile']; // Define allowed paths

    // Check if the method is valid
    if (!validMethods.includes(req.method)) {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Check if the path is valid
    if (!validPaths.includes(req.path)) {
        return res.status(404).json({ error: 'Not Found' });
    }

    // Check if required headers are present (for example, Content-Type and Authorization)
    if (!req.headers['content-type'] || !req.headers['authorization']) {
        return res.status(400).json({ error: 'Bad Request: Missing headers' });
    }

    // If all checks pass, move to the next middleware
    next();
};

module.exports = validateRequest;

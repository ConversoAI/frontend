// src/utils/authService.js

// Mock user data for development
const fakeUsers = [
    {
        email: "demo@conversoaistudio.com",
        password: "password123",
        user_id: "user123",
        first_name: "Cameron",
        last_name: "Williamson",
        token: "fake-jwt-token-12345"
    }
];

/**
 * Simulates a login API call
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Resolves with user data or rejects with error
 */
export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = fakeUsers.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem('token', user.token);
                localStorage.setItem('user', JSON.stringify({
                    user_id: user.user_id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name
                }));
                resolve(user);
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 500); // Simulate API delay
    });
};

/**
 * Logs out the user by removing token and user data from storage
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * Checks if user is authenticated
 * @returns {boolean} - True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

/**
 * Gets the current user data from storage
 * @returns {object|null} - User data or null if not logged in
 */
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};
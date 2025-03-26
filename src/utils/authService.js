// src/utils/authService.js

const API_BASE_URL = "https://dev.app.conversoaistudio.com/api";

/**
 * Performs login via API
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {boolean} isGoogleLogin - Whether this is a Google login
 * @returns {Promise} - Resolves with user data or rejects with error
 */
export const login = async (email, password, isGoogleLogin = false) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        is_google_login: isGoogleLogin,
      }),
    });

    const data = await response.json();
    console.log("Login response:", data);

    // Handle error responses
    if (!response.ok) {
      throw new Error(
        data.message || `Login failed with status: ${response.status}`,
      );
    }

    // Check if login was successful
    if (!data.success) {
      throw new Error(
        data.message || "Login failed. Please check your credentials.",
      );
    }

    // Store token and user data in localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Registers a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} - Resolves with user data or rejects with error
 */
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
        mobile_number: userData.mobileNumber,
        company: userData.company,
        is_google_login: userData.isGoogleLogin || false,
      }),
    });

    const data = await response.json();

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(
        data.message || `Registration failed with status: ${response.status}`,
      );
    }

    // Check if registration was successful
    if (!data.success) {
      throw new Error(data.message || "Registration failed. Please try again.");
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

/**
 * Request password reset for a user
 * @param {string} email - User email
 * @returns {Promise} - Resolves with response data or rejects with error
 */
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Password reset request failed with status: ${response.status}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};

/**
 * Update user password
 * @param {Object} passwordData - Password update data
 * @returns {Promise} - Resolves with response data or rejects with error
 */
export const updatePassword = async (passwordData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token if required
      },
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Password update failed with status: ${response.status}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Update password error:", error);
    throw error;
  }
};

/**
 * Submit contact form
 * @param {Object} contactData - Contact form data
 * @returns {Promise} - Resolves with response data or rejects with error
 */
export const contactUs = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/contact-us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Contact form submission failed with status: ${response.status}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Contact form error:", error);
    throw error;
  }
};

/**
 * Logs out the user by removing token and user data from storage
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Checks if user is authenticated
 * @returns {boolean} - True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

/**
 * Gets the current user data from storage
 * @returns {object|null} - User data or null if not logged in
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

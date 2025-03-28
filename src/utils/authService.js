// src/utils/authService.js

const API_BASE_URL = "https://dev.app.conversoaistudio.com/api";

/**
 * Performs login via API
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {boolean} isGoogleLogin - Whether this is a Google login
 * @returns {Promise} - Resolves with user data or rejects with error
 */
export const login = async (
  email,
  password,
  rememberMe = false,
  isGoogleLogin = false,
) => {
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
    // console.log("Login response:", data);

    // Handle error responses
    if (!response.ok) {
      throw new Error(
        data.message || `Login failed with status: ${response.status}`,
      );
    }

    // The API doesn't return a success field, but instead returns an access_token when successful
    if (!data.access_token) {
      throw new Error(
        data.message || "Login failed. Please check your credentials.",
      );
    }

    // Store token and user data in localStorage
    if (data.access_token) {
      const userData = { ...data };
      delete userData.access_token;
      delete userData.token_type;
      delete userData.expires_in;

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", data.access_token);
      storage.setItem("user", JSON.stringify(userData));
    }

    // Store user data (excluding token fields)
    const userData = { ...data };
    delete userData.access_token;
    delete userData.token_type;
    delete userData.expires_in;

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
      // Using login endpoint for signup as specified
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
        mobile_number: userData.mobileNumber || "",
        company: userData.company || "",
        is_google_login: userData.isGoogleLogin || false,
      }),
    });

    const data = await response.json();
    console.log("Signup response:", data);

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(
        data.message || `Registration failed with status: ${response.status}`,
      );
    }

    // Check if registration was successful - this specific message is actually a success
    if (
      !data.access_token &&
      !data.message?.includes("Registration successful")
    ) {
      throw new Error(data.message || "Registration failed. Please try again.");
    }

    // If we got a success message about verifying email, we should still return successfully
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
 * Join waitlist
 * @param {Object} waitlistData - Waitlist data (email, first_name, last_name)
 * @returns {Promise} - Resolves with response data or rejects with error
 */
export const joinWaitlist = async (waitlistData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(waitlistData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Waitlist submission failed with status: ${response.status}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Waitlist error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};
export const isAuthenticated = () => {
  return (
    localStorage.getItem("token") !== null ||
    sessionStorage.getItem("token") !== null
  );
};

export const getCurrentUser = () => {
  const userStr =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

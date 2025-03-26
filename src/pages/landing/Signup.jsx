// src/pages/landing/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/landing/Navbar";
import Footer from "../../components/landing/Footer";
import { register } from "../../utils/authService";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    company: "",
    isGoogleLogin: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear API error when user makes any change
    if (apiError) setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        formData.password,
      )
    ) {
      newErrors.password =
        "Password must include uppercase, lowercase, number and special character";
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Validate mobile number (optional but should be valid if provided)
    if (
      formData.mobileNumber &&
      !/^\+?[1-9]\d{1,14}$/.test(formData.mobileNumber)
    ) {
      newErrors.mobileNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError("");

    try {
      // Call the register function from authService
      const data = await register(formData);
      // console.log("Registration successful:", data);

      // Check if the response contains verification message
      const message =
        data.message || "Account created successfully! Please sign in.";

      // Redirect to login page on successful registration
      navigate("/login", {
        state: {
          notification: message,
        },
      });
    } catch (err) {
      setApiError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setApiError("Google signup is not yet implemented");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full mx-auto space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Join ConversoAI and start building multilingual chatbots
            </p>
          </div>

          {apiError && (
            <div className="alert alert-error shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{apiError}</span>
              </div>
            </div>
          )}

          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control w-full">
                  <label className="floating-label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`input input-bordered w-full ${errors.firstName ? "input-error" : ""}`}
                    placeholder="Enter your first name"
                    required
                  />
                  {errors.firstName && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.firstName}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="floating-label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`input input-bordered w-full ${errors.lastName ? "input-error" : ""}`}
                    placeholder="Enter your last name"
                    required
                  />
                  {errors.lastName && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.lastName}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              <div className="form-control w-full">
                <label className="floating-label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                  placeholder="Enter your email address"
                  required
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.email}
                    </span>
                  </label>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control w-full">
                  <label className="floating-label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                    placeholder="Enter your password"
                    required
                  />
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.password}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="floating-label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`input input-bordered w-full ${errors.confirmPassword ? "input-error" : ""}`}
                    placeholder="Confirm your password"
                    required
                  />
                  {errors.confirmPassword && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.confirmPassword}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control w-full">
                  <label className="floating-label">
                    <span className="label-text">Mobile Number (Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className={`input input-bordered w-full ${errors.mobileNumber ? "input-error" : ""}`}
                    placeholder="e.g. +1234567890"
                  />
                  {errors.mobileNumber && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.mobileNumber}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control w-full">
                  <label className="floating-label">
                    <span className="label-text">Company (Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    required
                  />
                  <span className="label-text">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 186.69 190.5"
                  >
                    <g transform="translate(1184.583 765.171)">
                      <path
                        clipPath="none"
                        mask="none"
                        d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                        fill="#4285f4"
                      />
                      <path
                        clipPath="none"
                        mask="none"
                        d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                        fill="#34a853"
                      />
                      <path
                        clipPath="none"
                        mask="none"
                        d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                        fill="#fbbc05"
                      />
                      <path
                        d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                        fill="#ea4335"
                        clipPath="none"
                        mask="none"
                      />
                    </g>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary-focus"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

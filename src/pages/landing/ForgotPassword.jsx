// src/pages/landing/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Simulate API call for now
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Reset password requested for:', email);

            setIsSubmitted(true);
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reset Your Password</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your email address and we'll send you a link to reset your password
                        </p>
                    </div>

                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {!isSubmitted ? (
                            <>
                                {error && (
                                    <div className="alert alert-error mb-6">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{error}</span>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Email address</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="input input-bordered w-full"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-6 text-center">
                                    <Link
                                        to="/login"
                                        className="text-sm font-medium text-primary hover:text-primary-focus"
                                    >
                                        Back to Login
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="py-8 text-center">
                                <div className="flex justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg mb-2">Check Your Email</h3>
                                <p className="mb-6">
                                    We've sent a password reset link to <span className="font-medium">{email}</span>.
                                    Please check your inbox and follow the instructions to reset your password.
                                </p>
                                <p className="text-sm text-gray-600 mb-6">
                                    If you don't see the email, please check your spam folder.
                                </p>
                                <Link to="/login" className="btn btn-primary">
                                    Return to Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
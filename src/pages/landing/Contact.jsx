import { useState } from 'react';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';

export default function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Contact form submitted:', formData);

            // Show success state
            setIsSubmitted(true);

            // Reset form after success
            setTimeout(() => {
                setFormData({
                    fullName: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setIsSubmitted(false);
            }, 5000);
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow bg-gray-50">
                {/* Hero section */}
                <div className="bg-primary text-primary-content px-4 py-16 md:px-20 md:py-24">
                    <div className="container mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact ConversoAI</h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                            Get in touch with our team to learn more about our multilingual chatbot platform
                        </p>
                    </div>
                </div>

                {/* Contact section */}
                <div className="container mx-auto px-4 py-12 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact form */}
                        <div className="bg-white p-6 md:p-10 rounded-xl shadow-md">
                            {!isSubmitted ? (
                                <>
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h2>
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
                                            <label className="floating-label">
                                                <span className="label-text">Full Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                className="input input-bordered w-full"
                                                required
                                            />
                                        </div>

                                        <div className="form-control w-full mt-4">
                                            <label className="floating-label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email address"
                                                className="input input-bordered w-full"
                                                required
                                            />
                                        </div>

                                        <div className="form-control w-full mt-4">
                                            <label className="floating-label">
                                                <span className="label-text">Subject</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="Enter the subject"
                                                className="input input-bordered w-full"
                                                required
                                            />
                                        </div>

                                        <div className="form-control w-full mt-4">
                                            <label className="floating-label">
                                                <span className="label-text">Message</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Enter your message"
                                                className="textarea textarea-bordered w-full"
                                                rows="5"
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className={`btn btn-primary w-full mt-6 ${isSubmitting ? 'loading' : ''}`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="py-12 text-center">
                                    <div className="flex justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-xl mb-2 text-gray-800">Message Sent!</h3>
                                    <p className="text-gray-600">
                                        Thank you for reaching out. Our team will get back to you shortly.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Contact info */}
                        <div className="flex flex-col justify-center">
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <span className="text-primary bg-primary/10 p-3 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700">Email</h3>
                                            <p className="text-gray-600">contact@conversoaistudio.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <span className="text-primary bg-primary/10 p-3 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-700">Headquarters</h3>
                                            <p className="text-gray-600">Pune, MH, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/10 p-6 rounded-xl">
                                <h3 className="text-xl font-bold mb-4 text-gray-800">Operating Hours</h3>
                                <div className="space-y-2">
                                    <p className="flex justify-between text-gray-600">
                                        <span>Monday - Friday</span>
                                        <span>9:00 AM - 6:00 PM PST</span>
                                    </p>
                                    <p className="flex justify-between text-gray-600">
                                        <span>Saturday - Sunday</span>
                                        <span>Closed</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
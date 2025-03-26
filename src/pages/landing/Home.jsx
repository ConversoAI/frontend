// src/pages/landing/Home.jsx
import { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import WaitlistModal from '../../components/landing/WaitlistModal';
import bgImage from '../../assets/bg/homeHeroBg.png';
import chatbotSad from '../../assets/chatbot-sad.png';

export default function Home() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const problemSectionRef = useRef(null);
    const featuresSectionRef = useRef(null);
    const ctaSectionRef = useRef(null);

    const [isVisibleProblem, setIsVisibleProblem] = useState(false);
    const [isVisibleFeatures, setIsVisibleFeatures] = useState(false);
    const [isVisibleCta, setIsVisibleCta] = useState(false);

    const openWaitlistModal = () => {
        document.getElementById('waitlist_modal').showModal();
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);

            // Check if sections are visible
            if (problemSectionRef.current) {
                const rect = problemSectionRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8 && rect.bottom >= 0) {
                    setIsVisibleProblem(true);
                }
            }

            if (featuresSectionRef.current) {
                const rect = featuresSectionRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8 && rect.bottom >= 0) {
                    setIsVisibleFeatures(true);
                }
            }

            if (ctaSectionRef.current) {
                const rect = ctaSectionRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8 && rect.bottom >= 0) {
                    setIsVisibleCta(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        setTimeout(handleScroll, 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow overflow-hidden">
                {/* Hero section */}
                <div
                    className="hero bg-emerald-600 bg-cover bg-center px-4 py-8 md:px-20 md:py-32 relative min-h-[90vh] overflow-hidden"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundPosition: `center ${scrollPosition * 0.4}px`
                    }}
                >
                    <div className="text-primary-content text-center">
                        <div className="text-left md:text-center">
                            <h1 className="text-3xl leading-10 md:text-5xl md:leading-relaxed font-bold">
                                Break Language Barriers with Agentic AI-Powered Multilingual Chatbots
                            </h1>
                            <p className="py-6 text-md md:text-xl">
                                Communicate with customers in 100+ languages using intelligent conversational agents that understand context and nuance
                            </p>
                            <button
                                className="btn w-full md:w-fit"
                                onClick={openWaitlistModal}
                            >
                                Join Waitlist
                            </button>
                        </div>
                    </div>
                </div>

                {/* Problem/Solution section */}
                <section
                    ref={problemSectionRef}
                    className="w-full px-4 py-12 md:px-20 md:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
                >
                    <div className='container mx-auto'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                            {/* Left column - robot */}
                            <div className={`flex flex-row justify-center items-center transition-all duration-1000 ${isVisibleProblem ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="relative p-6">
                                    <div className="absolute inset-0 bg-emerald-100 rounded-full opacity-30"></div>
                                    <img
                                        src={chatbotSad}
                                        alt="Chatbot"
                                        className='max-w-full h-auto drop-shadow-xl hover:scale-105 transition-transform'
                                        style={{
                                            animation: 'float 6s ease-in-out infinite',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Right column - content */}
                            <div className={`flex flex-col items-start justify-center gap-8 transition-all duration-1000 delay-300 ${isVisibleProblem ? 'opacity-100' : 'opacity-0'}`}>
                                <h2 className='text-2xl md:text-4xl font-bold text-gray-800 relative'>
                                    Global reach with local understanding
                                    <span className="absolute -bottom-2 left-0 w-20 h-1 bg-emerald-500"></span>
                                </h2>

                                <div className='flex flex-col gap-8'>
                                    <div className='flex flex-col md:flex-row gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
                                        <span className='text-primary bg-emerald-50 p-3 rounded-full self-start'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </span>
                                        <div>
                                            <h3 className='text-lg md:text-xl font-bold text-gray-700 mb-2'>The Cost of Language Barriers</h3>
                                            <p className='text-sm md:text-base text-gray-600'>In today's global marketplace, businesses without multilingual support lose 40% of potential international customers. Traditional translation services are slow, expensive, and miss cultural context.</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col md:flex-row gap-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
                                        <span className='text-primary bg-emerald-50 p-3 rounded-full self-start'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                            </svg>
                                        </span>
                                        <div>
                                            <h3 className='text-lg md:text-xl font-bold text-gray-700 mb-2'>With Our Multilingual Chatbot Platform</h3>
                                            <p className='text-sm md:text-base text-gray-600'>Deliver exceptional multilingual experiences fast - without the complexity of traditional translation services. Accelerate global customer engagement, eliminate language barriers, and deploy across all channels with ease.</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={openWaitlistModal}
                                    className="btn btn-primary mt-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    Join Waitlist
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={featuresSectionRef} className="w-full px-4 py-12 md:px-20 md:py-32 bg-gray-50 relative overflow-hidden">
                    <div className={`container mx-auto text-center transition-all duration-1000 ${isVisibleFeatures ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Powerful Features for Seamless Multilingual Communication
                            </h2>
                            <p className="text-lg max-w-2xl mx-auto">
                                Our platform combines advanced AI with linguistic expertise to create natural
                                conversations in any language.
                            </p>
                        </div>

                        {/* Feature 1 - Context-Aware Translation */}
                        <div className="flex flex-col md:flex-row items-center mb-16 bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="md:w-1/2 p-6 md:p-10">
                                <div className="flex items-center mb-4">
                                    <span className="text-primary mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                        </svg>
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold">Context-Aware Translation</h3>
                                </div>
                                <p className="text-gray-600 text-left">
                                    Unlike basic translation tools, our AI maintains conversation context across language switches,
                                    ensuring natural dialogue flow and accurate meaning preservation in all 100+ supported languages.
                                </p>
                            </div>
                            <div className="md:w-1/2 p-6 bg-gray-50">
                                <div className="mockup-browser border border-base-300 bg-base-100 shadow-xl">
                                    <div className="mockup-browser-toolbar">
                                        <div className="input">https://yourapp.com/chat</div>
                                    </div>
                                    <div className="px-4 py-4 bg-base-100">
                                        <div className="chat chat-start">
                                            <div className="chat-bubble bg-gray-200 text-gray-800">Hello, how can I help?</div>
                                        </div>
                                        <div className="chat chat-end">
                                            <div className="chat-bubble bg-primary text-white">Bonjour, parlez-vous français?</div>
                                        </div>
                                        <div className="chat chat-start">
                                            <div className="chat-bubble bg-gray-200 text-gray-800">Oui, je parle français!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 - Cultural Intelligence */}
                        <div className="flex flex-col md:flex-row-reverse items-center mb-16 bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="md:w-1/2 p-6 md:p-10">
                                <div className="flex items-center mb-4">
                                    <span className="text-primary mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold">Cultural Intelligence</h3>
                                </div>
                                <p className="text-gray-600 text-left">
                                    Our platform adapts tone, expressions, and formality based on cultural expectations,
                                    helping your business build trust with customers worldwide by communicating appropriately
                                    in their language.
                                </p>
                            </div>
                            <div className="md:w-1/2 p-6 bg-gray-50">
                                <div className="mockup-browser border border-base-300 bg-base-100 shadow-xl">
                                    <div className="mockup-browser-toolbar">
                                        <div className="input">https://yourapp.com/settings</div>
                                    </div>
                                    <div className="flex justify-center px-4 py-8 bg-base-100">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-2 max-w-sm">
                                                <span className="badge badge-primary">English</span>
                                                <span className="badge badge-primary">Español</span>
                                                <span className="badge badge-primary">中文</span>
                                                <span className="badge badge-primary">العربية</span>
                                                <span className="badge badge-primary">हिन्दी</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3 - Easy Deployment Everywhere */}
                        <div className="flex flex-col md:flex-row items-center mb-16 bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="md:w-1/2 p-6 md:p-10">
                                <div className="flex items-center mb-4">
                                    <span className="text-primary mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold">Easy Deployment Everywhere</h3>
                                </div>
                                <p className="text-gray-600 text-left">
                                    Integrate our multilingual chatbot across websites, WhatsApp, Telegram, and other platforms
                                    with one simple API, reaching customers through their preferred channels without additional
                                    configuration.
                                </p>
                            </div>
                            <div className="md:w-1/2 p-6 bg-gray-50">
                                <div className="mockup-browser border border-base-300 bg-base-100 shadow-xl">
                                    <div className="mockup-browser-toolbar">
                                        <div className="input">https://yourapp.com/deploy</div>
                                    </div>
                                    <div className="flex justify-center px-4 py-8 bg-base-100">
                                        <div className="flex flex-col items-center">
                                            <div className="flex gap-4 mb-6">
                                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                                    </svg>
                                                </div>
                                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="badge badge-success">Connected</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-10">
                            <button className="btn btn-primary btn-lg" onClick={openWaitlistModal}>
                                Join Waitlist
                            </button>
                        </div>
                    </div>
                </section>

                {/* Final CTA section */}
                <section
                    ref={ctaSectionRef}
                    className="w-full px-4 py-16 md:px-20 md:py-24 bg-primary text-primary-content relative overflow-hidden"
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full" style={{
                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
                            backgroundSize: '30px 30px'
                        }}></div>
                    </div>

                    <div className={`container mx-auto text-center transition-all duration-1000 ${isVisibleCta ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Break Language Barriers?</h2>
                        <p className="text-xl max-w-3xl mx-auto mb-10">Join innovative businesses already transforming their global communication with our multilingual chatbot platform.</p>

                        <div className='flex flex-col justify-center items-center'>
                            <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-100 text-base-content max-w-4xl mx-auto mb-10">
                                <div className="stat">
                                    <div className="stat-title">Languages</div>
                                    <div className="stat-value">100+</div>
                                    <div className="stat-desc">Supported languages</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">Cost Savings</div>
                                    <div className="stat-value">70%</div>
                                    <div className="stat-desc">vs. traditional translation</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">Response Time</div>
                                    <div className="stat-value">Instant</div>
                                    <div className="stat-desc">Real-time conversations</div>
                                </div>
                            </div>

                            <button
                                onClick={openWaitlistModal}
                                className="btn bg-white text-primary hover:bg-gray-100 border-none shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                Join Our Waitlist
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>

                <WaitlistModal />
            </main>
            <Footer />

            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </div>
    );
}
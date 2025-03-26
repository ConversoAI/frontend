import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';

export default function Privacy() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50">
                {/* Hero section */}
                <div className="bg-primary text-primary-content px-4 py-12 md:px-20 md:py-16">
                    <div className="container mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                            How we collect, use, and protect your data
                        </p>
                    </div>
                </div>

                {/* Privacy content */}
                <div className="container mx-auto px-4 py-12 md:py-16">
                    <div className="bg-white p-6 md:p-10 rounded-xl shadow-md">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600">
                                Last Updated: March 25, 2025
                            </p>

                            <p>
                                At ConversoAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our multilingual chatbot platform.
                            </p>

                            <h2 className="mt-8">1. Information We Collect</h2>
                            <p>
                                We collect several types of information to provide and improve our Service:
                            </p>

                            <h3 className="mt-6">1.1 Personal Information</h3>
                            <p>
                                When you register for an account or use our Service, we may collect personally identifiable information, such as:
                            </p>
                            <ul className="list-disc pl-8 mt-4 mb-6">
                                <li>Name and contact details (email address, phone number)</li>
                                <li>Billing information and transaction details</li>
                                <li>Company information and job title</li>
                                <li>User credentials (username and password)</li>
                            </ul>

                            <h3 className="mt-6">1.2 Usage Data</h3>
                            <p>
                                We automatically collect information on how you interact with our Service, including:
                            </p>
                            <ul className="list-disc pl-8 mt-4 mb-6">
                                <li>IP address and device information</li>
                                <li>Browser type and version</li>
                                <li>Pages visited and features used</li>
                                <li>Time and date of your visits</li>
                                <li>Chatbot conversations and interactions</li>
                                <li>Language preferences</li>
                            </ul>

                            <h3 className="mt-6">1.3 Customer Content</h3>
                            <p>
                                Our Service processes text, data, and conversations you provide through our platform, including:
                            </p>
                            <ul className="list-disc pl-8 mt-4 mb-6">
                                <li>Messages sent through the chatbot</li>
                                <li>Custom chatbot configurations</li>
                                <li>Language and translation preferences</li>
                            </ul>

                            <h2 className="mt-8">2. How We Use Your Information</h2>
                            <p>
                                We use the information we collect for various purposes:
                            </p>
                            <ul className="list-disc pl-8 mt-4 mb-6">
                                <li>To provide, maintain, and improve our Service</li>
                                <li>To process transactions and manage your account</li>
                                <li>To send you technical notices, updates, and administrative messages</li>
                                <li>To respond to your comments and questions</li>
                                <li>To provide customer support</li>
                                <li>To train and improve our AI models and translation quality</li>
                                <li>To analyze usage patterns and optimize user experience</li>
                                <li>To detect, prevent, and address technical issues</li>
                            </ul>

                            <h2 className="mt-8">3. Data Storage and Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                            <p>
                                While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                            </p>

                            <h2 className="mt-8">4. Data Sharing and Disclosure</h2>
                            <p>
                                We may share your information in the following circumstances:
                            </p>
                            <ul className="list-disc pl-8 mt-4 mb-6">
                                <li><strong>Service Providers:</strong> We may employ third-party companies to facilitate our Service, provide the Service on our behalf, or assist us in analyzing how our Service is used.</li>
                                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</li>
                                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
                                <li><strong>With Your Consent:</strong> We may share your information with your consent or as otherwise specified at the time of collection.</li>
                            </ul>

                            <h2 className="mt-8">5. Cookies and Tracking Technologies</h2>
                            <p>
                                We use cookies and similar tracking technologies to track activity on our Service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>

                            <h2 className="mt-8">6. Data Processing in Different Countries</h2>
                            <p>
                                As a global service, we may process your information in countries where we operate, which may have different data protection laws than your country of residence. By using our Service, you consent to the transfer of your information to these countries.
                            </p>

                            <h2 className="mt-8">7. Your Data Rights</h2>
                            <p>
                                Depending on your location, you may have certain rights regarding your personal information:
                            </p>
                            <ul className="list-disc pl-8 mt-4 mb-6">
                                <li>Access, update, or delete your information</li>
                                <li>Obtain a copy of your data in a structured, machine-readable format</li>
                                <li>Object to or restrict certain processing activities</li>
                                <li>Withdraw consent where applicable</li>
                            </ul>
                            <p>
                                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
                            </p>

                            <h2 className="mt-8">8. Children's Privacy</h2>
                            <p>
                                Our Service is not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                            </p>

                            <h2 className="mt-8">9. Changes to This Privacy Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                            </p>
                            <p>
                                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p>

                            <h2 className="mt-8">10. Contact Us</h2>
                            <p>
                                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                            </p>
                            <p>
                                ConversoAI<br />
                                Pune, MH, India<br />
                                Email: contact@conversoaistudio.com
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
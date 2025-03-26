import { Link } from "react-router-dom";
import Logo from '../../assets/logo.svg';

export default function Footer() {
    return (
        <footer className="rounded-lg shadow-sm bg-base-200">
            <div className="w-full mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link to="/"><img src={Logo} className="mb-2" alt="ConversoAI Logo" /></Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm text-base-content sm:mb-0">
                        <li>
                            <Link to="/contact" className="hover:underline me-4 md:me-6">Contact</Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/terms" className="hover:underline me-4 md:me-6">Terms & Conditions</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-400 sm:mx-auto lg:my-8" />
                <div className="flex flex-wrap text-sm text-base-content sm:mb-0 justify-between">
                    <span className="block text-sm text-base-content sm:text-center">Copyright © {new Date().getFullYear()} - All right reserved by <a href="https://www.hyperionaistudio.com/" target="_blank" rel="noopener noreferrer" className="link link-hover">Hyperion AI Studio</a></span>
                    <span className="block text-sm text-base-content sm:text-center">Made with ✨ by <a href="https://www.patanglabs.design/" target="_blank" rel="noopener noreferrer" className="link link-hover"> Patang Labs</a></span>
                </div>
            </div>
        </footer>
    )
}
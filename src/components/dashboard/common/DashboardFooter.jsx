import { Link } from 'react-router-dom';

const DashboardFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="mt-auto py-3 px-6 text-sm text-gray-600 border-t border-[#E5E7EB] bg-white flex justify-between items-center ">
            <div>
                © {currentYear} | <a href="https://hyperionai.com" className="hover:text-primary" target="_blank" rel="noopener noreferrer">Hyperion AI</a>
            </div>

            <div className="flex items-center space-x-6">
                <Link to="/privacy" className="hover:text-primary">
                    Privacy Policy
                </Link>
                <span className="text-gray-300">|</span>
                <Link to="/terms" className="hover:text-primary">
                    Terms of Use
                </Link>
            </div>

            <div>
                <span className="block text-sm text-base-content sm:text-center">Made with ✨ by <a href="https://www.patanglabs.design/" target="_blank" rel="noopener noreferrer" className="link link-hover"> Patang Labs</a></span>
            </div>
        </div>
    );
};

export default DashboardFooter;
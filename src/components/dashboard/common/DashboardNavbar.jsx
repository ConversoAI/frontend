// src/components/dashboard/common/DashboardNavbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Logo from '../../../assets/logo.svg';

const DashboardNavbar = () => {
    const location = useLocation();
    const { user } = useAuth();

    // Helper function to get the current page title
    const getPageTitle = () => {
        const path = location.pathname;

        if (path === '/dashboard') return 'Dashboard';
        if (path === '/dashboard/chatbots') return 'Chatbots';
        if (path === '/dashboard/settings') return 'Settings';
        if (path === '/dashboard/support') return 'Support';

        return '';
    };

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
                {getPageTitle()}
            </h1>

            <div className="flex items-center">
                <div className="flex items-center gap-2">
                    {user ? (
                        <>
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                                {user.first_name && user.last_name
                                    ? `${user.first_name[0]}${user.last_name[0]}`
                                    : 'CW'}
                            </div>
                            <span className="text-sm font-medium">
                                {user.first_name && user.last_name
                                    ? `${user.first_name} ${user.last_name}`
                                    : 'Cameron Williamson'}
                            </span>
                        </>
                    ) : (
                        <>
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                                CW
                            </div>
                            <span className="text-sm font-medium">
                                Cameron Williamson
                            </span>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
// src/layouts/DashboardLayout.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardNavbar from '../components/dashboard/common/DashboardNavbar';
import CollapsibleSidebar from '../components/dashboard/common/CollapsibleSidebar';
import DashboardFooter from '../components/dashboard/common/DashboardFooter';

export default function DashboardLayout({ children }) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <CollapsibleSidebar onLogout={handleLogout} />

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top header */}
                <DashboardNavbar />

                {/* Main content area */}
                <main className="flex-1 overflow-auto p-6 bg-gray-50">
                    {children}
                </main>

                {/* Footer */}
                <DashboardFooter />
            </div>
        </div>
    );
}
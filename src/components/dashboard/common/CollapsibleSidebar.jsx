// src/components/dashboard/common/AutoCollapsingSidebar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../../assets/logo.svg';

const CollapsibleSidebar = ({ onLogout }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [hovered, setHovered] = useState(false);
    const location = useLocation();
    const timeoutRef = useRef(null);
    const sidebarRef = useRef(null);

    // Determine if a route is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Function to manually toggle collapse state
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
        resetCollapseTimer();
    };

    // Reset collapse timer
    const resetCollapseTimer = () => {
        // Clear any existing timeouts
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout - collapse after 30 seconds of inactivity
        timeoutRef.current = setTimeout(() => {
            if (!hovered) {
                setCollapsed(true);
            }
        }, 1000); // 10 seconds
    };

    // Handle mouse enter - expand the sidebar
    const handleMouseEnter = () => {
        setHovered(true);
        if (collapsed) {
            setCollapsed(false);
        }
        resetCollapseTimer();
    };

    // Handle mouse leave - start countdown to collapse
    const handleMouseLeave = () => {
        setHovered(false);
        resetCollapseTimer();
    };

    // Set up initial timer and clean up
    useEffect(() => {
        resetCollapseTimer();

        // Cleanup on unmount
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Reset timer on location change
    useEffect(() => {
        resetCollapseTimer();
    }, [location]);

    // Show either the expanded or collapsed view
    const showExpanded = hovered || !collapsed;

    return (
        <div
            ref={sidebarRef}
            className={`bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ${showExpanded ? 'w-56' : 'w-16'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Logo and collapse button */}
            <div className="flex items-center justify-between p-4">
                {showExpanded && (
                    <Link to="/">
                        <img src={Logo} alt="ConversoAI" className="h-7" />
                    </Link>
                )}
                <button
                    onClick={toggleCollapse}
                    className={`text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 ${!showExpanded ? 'mx-auto' : ''}`}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed && !hovered ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 pt-4">
                <ul className="space-y-1">
                    <li>
                        <Link
                            to="/dashboard"
                            className={`flex items-center py-3 ${!showExpanded ? 'px-4 justify-center' : 'px-6'} ${isActive('/dashboard')
                                ? 'text-primary border-l-4 border-primary'
                                : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                                }`}
                            title="Dashboard"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg>
                            {showExpanded && <span className="ml-3">Dashboard</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/chatbots"
                            className={`flex items-center py-3 ${!showExpanded ? 'px-4 justify-center' : 'px-6'} ${isActive('/dashboard/chatbots')
                                ? 'text-primary border-l-4 border-primary'
                                : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                                }`}
                            title="Chatbots"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg>
                            {showExpanded && <span className="ml-3">Chatbots</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/settings"
                            className={`flex items-center py-3 ${!showExpanded ? 'px-4 justify-center' : 'px-6'} ${isActive('/dashboard/settings')
                                ? 'text-primary border-l-4 border-primary'
                                : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                                }`}
                            title="Settings"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg>
                            {showExpanded && <span className="ml-3">Settings</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/support"
                            className={`flex items-center py-3 ${!showExpanded ? 'px-4 justify-center' : 'px-6'} ${isActive('/dashboard/support')
                                ? 'text-primary border-l-4 border-primary'
                                : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                                }`}
                            title="Support"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path d="M12 17H12.01"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg>
                            {showExpanded && <span className="ml-3">Support</span>}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Logout button */}
            <div className="mt-auto">
                <button
                    onClick={onLogout}
                    className={`flex items-center py-3 w-full text-left text-gray-700 hover:bg-gray-50 ${!showExpanded ? 'px-4 justify-center' : 'px-6'}`}
                    title="Logout"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                    {showExpanded && <span className="ml-3">Logout</span>}
                </button>
            </div>
        </div>
    );
};

CollapsibleSidebar.propTypes = {
    onLogout: PropTypes.func.isRequired
};

export default CollapsibleSidebar;
// src/pages/dashboard/Settings.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Settings() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const [profile, setProfile] = useState({
        first_name: user?.first_name || 'Cameron',
        last_name: user?.last_name || 'Williamson',
        email: user?.email || 'demo@conversoai.com',
        role: 'Admin',
        company: 'Acme Corp',
        timezone: 'Asia/Kolkata'
    });

    const [notification, setNotification] = useState({
        email_updates: true,
        message_notifications: true,
        performance_reports: true,
        billing_alerts: false
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotification({
            ...notification,
            [name]: checked
        });
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setIsEditing(false);
            setSuccessMessage('Profile updated successfully');

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }, 1000);
    };

    const handleSaveNotifications = (e) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setSuccessMessage('Notification preferences updated successfully');

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">Account Settings</h1>
            </div>

            {/* Success message */}
            {successMessage && (
                <div className="alert alert-success shadow-lg">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{successMessage}</span>
                    </div>
                </div>
            )}

            {/* Tabs and content */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex border-b">
                    <button
                        className={`px-6 py-3 text-sm font-medium ${activeTab === 'profile' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={`px-6 py-3 text-sm font-medium ${activeTab === 'notifications' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        Notifications
                    </button>
                    <button
                        className={`px-6 py-3 text-sm font-medium ${activeTab === 'billing' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('billing')}
                    >
                        Billing
                    </button>
                    <button
                        className={`px-6 py-3 text-sm font-medium ${activeTab === 'security' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('security')}
                    >
                        Security
                    </button>
                </div>

                <div className="p-6">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold text-gray-800">Profile Information</h2>
                                {!isEditing ? (
                                    <button
                                        className="btn btn-sm btn-outline"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-sm btn-ghost"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>

                            {!isEditing ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">First Name</p>
                                        <p className="mt-1">{profile.first_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Last Name</p>
                                        <p className="mt-1">{profile.last_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <p className="mt-1">{profile.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Role</p>
                                        <p className="mt-1">{profile.role}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Company</p>
                                        <p className="mt-1">{profile.company}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Timezone</p>
                                        <p className="mt-1">{profile.timezone}</p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSaveProfile}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">First Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                className="input input-bordered"
                                                value={profile.first_name}
                                                onChange={handleProfileChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Last Name</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                className="input input-bordered"
                                                value={profile.last_name}
                                                onChange={handleProfileChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="input input-bordered"
                                                value={profile.email}
                                                onChange={handleProfileChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Role</span>
                                            </label>
                                            <select
                                                name="role"
                                                className="select select-bordered"
                                                value={profile.role}
                                                onChange={handleProfileChange}
                                            >
                                                <option value="Admin">Admin</option>
                                                <option value="Developer">Developer</option>
                                                <option value="Analyst">Analyst</option>
                                                <option value="Manager">Manager</option>
                                            </select>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Company</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                className="input input-bordered"
                                                value={profile.company}
                                                onChange={handleProfileChange}
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Timezone</span>
                                            </label>
                                            <select
                                                name="timezone"
                                                className="select select-bordered"
                                                value={profile.timezone}
                                                onChange={handleProfileChange}
                                            >
                                                <option value="Asia/Kolkata">Asia/Kolkata (GMT +5:30)</option>
                                                <option value="America/New_York">America/New_York (GMT -4:00)</option>
                                                <option value="Europe/London">Europe/London (GMT +1:00)</option>
                                                <option value="Australia/Sydney">Australia/Sydney (GMT +10:00)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button
                                            type="submit"
                                            className={`btn btn-primary ${isSaving ? 'loading' : ''}`}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Email Notifications</h2>
                                <p className="text-gray-600 mb-4">
                                    Configure when you'll receive email notifications from ConversoAI.
                                </p>

                                <form onSubmit={handleSaveNotifications}>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                id="email_updates"
                                                name="email_updates"
                                                type="checkbox"
                                                checked={notification.email_updates}
                                                onChange={handleNotificationChange}
                                                className="checkbox checkbox-primary"
                                            />
                                            <div className="ml-3">
                                                <label htmlFor="email_updates" className="text-sm font-medium text-gray-700">Product updates</label>
                                                <p className="text-xs text-gray-500">Get notified about new features and improvements.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                id="message_notifications"
                                                name="message_notifications"
                                                type="checkbox"
                                                checked={notification.message_notifications}
                                                onChange={handleNotificationChange}
                                                className="checkbox checkbox-primary"
                                            />
                                            <div className="ml-3">
                                                <label htmlFor="message_notifications" className="text-sm font-medium text-gray-700">Message notifications</label>
                                                <p className="text-xs text-gray-500">Get notified when chatbots receive new messages.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                id="performance_reports"
                                                name="performance_reports"
                                                type="checkbox"
                                                checked={notification.performance_reports}
                                                onChange={handleNotificationChange}
                                                className="checkbox checkbox-primary"
                                            />
                                            <div className="ml-3">
                                                <label htmlFor="performance_reports" className="text-sm font-medium text-gray-700">Weekly performance reports</label>
                                                <p className="text-xs text-gray-500">Receive a weekly summary of your chatbot's performance.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                id="billing_alerts"
                                                name="billing_alerts"
                                                type="checkbox"
                                                checked={notification.billing_alerts}
                                                onChange={handleNotificationChange}
                                                className="checkbox checkbox-primary"
                                            />
                                            <div className="ml-3">
                                                <label htmlFor="billing_alerts" className="text-sm font-medium text-gray-700">Billing alerts</label>
                                                <p className="text-xs text-gray-500">Get notified about your subscription and billing.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <button
                                            type="submit"
                                            className={`btn btn-primary ${isSaving ? 'loading' : ''}`}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? 'Saving...' : 'Save Preferences'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Billing Tab */}
                    {activeTab === 'billing' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Subscription</h2>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium text-gray-900">Premium Plan</h3>
                                            <p className="text-sm text-gray-600">2,000,000 tokens per month</p>
                                        </div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-medium text-gray-900 mb-2">Usage this month</h3>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span>1,200,673 tokens</span>
                                        <span>2,000,000 tokens</span>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button className="btn btn-outline mr-2">
                                        Billing History
                                    </button>
                                    <button className="btn btn-primary">
                                        Upgrade Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Password</h2>

                                <form>
                                    <div className="space-y-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Current Password</span>
                                            </label>
                                            <input
                                                type="password"
                                                className="input input-bordered"
                                                placeholder="Enter your current password"
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">New Password</span>
                                            </label>
                                            <input
                                                type="password"
                                                className="input input-bordered"
                                                placeholder="Enter your new password"
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Confirm New Password</span>
                                            </label>
                                            <input
                                                type="password"
                                                className="input input-bordered"
                                                placeholder="Confirm your new password"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">API Keys</h2>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-600">
                                        API keys allow external applications to access the ConversoAI API on your behalf.
                                    </p>
                                </div>

                                <div className="border rounded-lg overflow-hidden mb-4">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Key Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Created
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Last Used
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">Production API Key</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">Mar 10, 2025</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">Today</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-red-600 hover:text-red-900">Revoke</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <button className="btn btn-outline btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Generate New API Key
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
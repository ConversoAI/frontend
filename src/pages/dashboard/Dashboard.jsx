// src/pages/dashboard/Dashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [stats] = useState({
        tokensUsed: 1200673,
        tokensLimit: 2000000,
        totalChatbots: 4,
        activeChatbots: 2
    });

    const [chatbots] = useState([
        {
            id: 1,
            name: "SBI Health Insurance Support",
            date: "04/03/2025",
            status: "Active"
        },
        {
            id: 2,
            name: "SBI Mobile App Chat",
            date: "02/04/2025",
            status: "Active"
        },
        {
            id: 3,
            name: "SBI Loan Enquiry Chat",
            date: "24/03/2025",
            status: "Inactive"
        },
        {
            id: 4,
            name: "SBI Banking Website Chat Support",
            date: "12/02/2025",
            status: "Inactive"
        }
    ]);

    return (
        <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-sm text-gray-500 font-medium">Tokens Used</h3>
                    <div className="mt-2 flex items-baseline">
                        <p className="text-2xl font-semibold">
                            {stats.tokensUsed.toLocaleString()}
                        </p>
                        <p className="ml-2 text-sm text-gray-500">
                            /{stats.tokensLimit.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-sm text-gray-500 font-medium">Total Chatbots</h3>
                    <p className="mt-2 text-2xl font-semibold">{stats.totalChatbots}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-sm text-gray-500 font-medium">Active Chatbots</h3>
                    <div className="mt-2 flex items-baseline">
                        <p className="text-2xl font-semibold">{stats.activeChatbots}</p>
                        <p className="ml-2 text-sm text-gray-500">/{stats.totalChatbots}</p>
                    </div>
                </div>
            </div>

            {/* Recent Chatbots */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Chatbots</h2>
                    <Link to="/dashboard/chatbots" className="text-primary text-sm hover:underline">
                        View All
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sr. No
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {chatbots.map((chatbot) => (
                                <tr key={chatbot.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {chatbot.id}.
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {chatbot.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {chatbot.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${chatbot.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {chatbot.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                        <button className="text-primary hover:text-primary-focus" title="Embed Code">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-800" title="Edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button className="text-red-600 hover:text-red-800" title="Delete">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Coming Soon */}
            <div className="bg-white rounded-lg shadow-sm p-10 text-center">
                <div className="flex justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary">More Analytics Coming Soon...</h3>
            </div>
        </div>
    );
}
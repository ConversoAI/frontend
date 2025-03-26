// src/components/dashboard/chatbots/index.jsx
import { useState, useCallback } from 'react';
import ChatbotFilter from './ChatbotFilter';
import ChatbotCard from './ChatbotCard';
import CreatePanel from './CreatePanel';

// Initial data - would normally come from an API
const initialChatbots = [
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
];

// Initial uploaded files for demo
const initialFiles = [
    {
        name: 'SBI-health-insurance-docs.pdf',
        time: '2m ago',
        size: '604KB',
        status: 'success'
    },
    {
        name: 'SBI-health-insurance-terms-and-conditions.pdf',
        time: '2m ago',
        size: '502KB',
        status: 'success'
    },
    {
        name: 'SBI-health-insurance-policy-guidelines.pdf',
        time: '2m ago',
        size: '724KB',
        status: 'success'
    },
    {
        name: 'SBI-health-insurance-docs.pdf',
        time: '3m ago',
        size: '',
        status: 'error'
    }
];

const ChatbotsPage = () => {
    const [chatbots, setChatbots] = useState(initialChatbots);
    const [filter, setFilter] = useState('All');
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    // Filter chatbots based on selected filter
    const filteredChatbots = filter === 'All'
        ? chatbots
        : chatbots.filter(chatbot => chatbot.status === filter);

    // Event handlers
    const handleFilterChange = useCallback((newFilter) => {
        setFilter(newFilter);
    }, []);

    const handleCreateChatbot = useCallback(() => {
        setIsPanelOpen(true);
    }, []);

    const handleClosePanel = useCallback(() => {
        setIsPanelOpen(false);
    }, []);

    const handleSubmitChatbot = useCallback((data) => {
        const newChatbot = {
            id: Math.max(...chatbots.map(c => c.id)) + 1,
            name: data.name,
            date: new Date().toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3'),
            status: 'Active'
        };

        setChatbots(prev => [...prev, newChatbot]);
        setIsPanelOpen(false);
    }, [chatbots]);

    const handleDeleteChatbot = useCallback((id) => {
        setChatbots(prev => prev.filter(chatbot => chatbot.id !== id));
    }, []);

    const handleEditChatbot = useCallback((id) => {
        // In a real app, you would likely open an edit panel
        console.log(`Editing chatbot ${id}`);
    }, []);

    const handleEmbedChatbot = useCallback((id) => {
        // In a real app, you would show embed code
        console.log(`Getting embed code for chatbot ${id}`);
    }, []);

    return (
        <div className="relative">
            {/* Header with Filter and Create Button */}
            <div className="flex justify-between items-center mb-6">
                <ChatbotFilter
                    activeFilter={filter}
                    onFilterChange={handleFilterChange}
                />

                <button
                    className="btn bg-primary hover:bg-primary-focus text-white"
                    onClick={handleCreateChatbot}
                >
                    Create Chatbot
                </button>
            </div>

            {/* Chatbot Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChatbots.map((chatbot) => (
                    <ChatbotCard
                        key={chatbot.id}
                        chatbot={chatbot}
                        onDelete={handleDeleteChatbot}
                        onEdit={handleEditChatbot}
                        onEmbed={handleEmbedChatbot}
                    />
                ))}
            </div>

            {/* Create Chatbot Panel */}
            <CreatePanel
                isOpen={isPanelOpen}
                onClose={handleClosePanel}
                onSubmit={handleSubmitChatbot}
                initialFiles={initialFiles}
            />
        </div>
    );
};

export default ChatbotsPage;
// src/components/dashboard/chatbots/ChatbotCard.jsx
import PropTypes from 'prop-types';

const ChatbotCard = ({ chatbot, onDelete, onEdit, onEmbed }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            {/* Status Badge */}
            <div className="mb-2">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${chatbot.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                    {chatbot.status}
                </span>
            </div>

            {/* Chatbot Info */}
            <h3 className="text-lg font-medium text-gray-900 mb-1">{chatbot.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{chatbot.date}</p>

            {/* Action Buttons */}
            <div className="flex space-x-4">
                <button
                    className="flex items-center text-primary hover:text-primary-focus"
                    onClick={() => onEmbed(chatbot.id)}
                    aria-label="Embed Code"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Embed Code
                </button>

                <button
                    className="flex items-center text-gray-700 hover:text-gray-900"
                    onClick={() => onEdit(chatbot.id)}
                    aria-label="Edit"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit
                </button>

                <button
                    className="flex items-center text-red-600 hover:text-red-800"
                    onClick={() => onDelete(chatbot.id)}
                    aria-label="Delete"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    );
};

ChatbotCard.propTypes = {
    chatbot: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onEmbed: PropTypes.func.isRequired
};

export default ChatbotCard;
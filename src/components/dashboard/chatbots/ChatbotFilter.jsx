// src/components/dashboard/chatbots/ChatbotFilter.jsx
import PropTypes from 'prop-types';

const ChatbotFilter = ({ activeFilter, onFilterChange }) => {
    return (
        <div className="bg-gray-50 rounded-lg inline-flex">
            {/* All Filter */}
            <button
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeFilter === 'All'
                        ? 'bg-white text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                onClick={() => onFilterChange('All')}
            >
                All
            </button>

            {/* Active Filter */}
            <button
                className={`px-4 py-2 text-sm font-medium ${activeFilter === 'Active'
                        ? 'bg-white text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                onClick={() => onFilterChange('Active')}
            >
                Active
            </button>

            {/* Inactive Filter */}
            <button
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeFilter === 'Inactive'
                        ? 'bg-white text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                onClick={() => onFilterChange('Inactive')}
            >
                Inactive
            </button>
        </div>
    );
};

ChatbotFilter.propTypes = {
    activeFilter: PropTypes.oneOf(['All', 'Active', 'Inactive']).isRequired,
    onFilterChange: PropTypes.func.isRequired
};

export default ChatbotFilter;
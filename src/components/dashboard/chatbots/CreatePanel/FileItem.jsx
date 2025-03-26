// src/components/dashboard/chatbots/CreatePanel/FileItem.jsx
import PropTypes from 'prop-types';

const FileItem = ({ file, onRemove }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20M8 14H16M8 18H16M8 10H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="ml-3">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.time}</p>
                </div>
            </div>

            <div className="flex items-center">
                {file.status === 'error' ? (
                    <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md">Error</span>
                ) : (
                    <span className="text-sm text-gray-700">{file.size}</span>
                )}

                {onRemove && (
                    <button
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        onClick={() => onRemove(file)}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

FileItem.propTypes = {
    file: PropTypes.shape({
        name: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        size: PropTypes.string,
        status: PropTypes.string
    }).isRequired,
    onRemove: PropTypes.func
};

export default FileItem;
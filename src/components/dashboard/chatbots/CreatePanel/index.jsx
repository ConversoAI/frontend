// src/components/dashboard/chatbots/CreatePanel/index.jsx
import { useState } from 'react';
import FileUploader from '../../../common/FileUploader';
import FileList from './FileList';

const CreatePanel = ({ isOpen, onClose, onSubmit, initialFiles = [] }) => {
    const [chatbotName, setChatbotName] = useState('');
    const [files, setFiles] = useState(initialFiles);

    const handleNameChange = (e) => {
        setChatbotName(e.target.value);
    };

    const handleFilesSelected = (newFiles) => {
        // Convert FileList to an array of file objects with additional properties
        const fileArray = Array.from(newFiles).map(file => ({
            name: file.name,
            time: 'Just now',
            size: `${Math.round(file.size / 1024)}KB`,
            status: 'success',
            file
        }));

        setFiles([...fileArray, ...files]);
    };

    const handleRemoveFile = (fileToRemove) => {
        setFiles(files.filter(file => file !== fileToRemove));
    };

    const handleSubmit = () => {
        onSubmit({
            name: chatbotName,
            files: files.filter(file => file.status !== 'error')
        });

        // Reset form
        setChatbotName('');
        setFiles([]);
    };

    return (
        <>
            <div className={`fixed inset-y-0 right-0 z-50 w-full md:max-w-md bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out overflow-hidden`}>
                <div className="flex flex-col h-full">
                    {/* Panel Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold">Create Chatbot</h2>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Panel Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {/* Chatbot Name Input */}
                        <div className="mb-6">
                            <div className="form-control w-full">
                                <label className="floating-label">
                                    <span className="label-text">Chatbot Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-gray-50"
                                    placeholder="Enter Chatbot Name"
                                    value={chatbotName}
                                    onChange={handleNameChange}
                                />
                            </div>
                        </div>

                        {/* File Upload Section */}
                        <div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Upload Files</span>
                                </label>
                                <p className="text-sm text-gray-500 mt-2 mb-4">
                                    Upload PDF's to train the Conversational AI
                                </p>
                            </div>

                            <FileUploader onFilesSelected={handleFilesSelected} />

                            <FileList files={files} onRemoveFile={handleRemoveFile} />
                        </div>
                    </div>

                    {/* Panel Footer */}
                    <div className="p-4 border-t bg-white">
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-medium"
                                onClick={handleSubmit}
                                disabled={!chatbotName.trim()}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transparent Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={onClose}
                ></div>
            )}
        </>
    );
};

export default CreatePanel;
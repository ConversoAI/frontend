// src/components/common/FileUploader.jsx
import { useRef } from 'react';
import PropTypes from 'prop-types';

const FileUploader = ({ onFilesSelected }) => {
    const fileInputRef = useRef(null);

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onFilesSelected(e.target.files);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFilesSelected(e.dataTransfer.files);
        }
    };

    return (
        <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer"
            onClick={handleBrowseClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                onChange={handleFileChange}
            />
            <p className="text-gray-600 mb-1">Click to browse or</p>
            <p className="text-gray-600">drag and drop your files</p>
        </div>
    );
};

FileUploader.propTypes = {
    onFilesSelected: PropTypes.func.isRequired,
};

export default FileUploader;
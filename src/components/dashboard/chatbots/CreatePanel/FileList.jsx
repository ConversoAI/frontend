// src/components/dashboard/chatbots/CreatePanel/FileList.jsx
import PropTypes from 'prop-types';
import FileItem from './FileItem';

const FileList = ({ files, onRemoveFile }) => {
    if (!files || files.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 space-y-4">
            {files.map((file, index) => (
                <FileItem
                    key={`${file.name}-${index}`}
                    file={file}
                    onRemove={onRemoveFile}
                />
            ))}
        </div>
    );
};

FileList.propTypes = {
    files: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            size: PropTypes.string,
            status: PropTypes.string
        })
    ).isRequired,
    onRemoveFile: PropTypes.func
};

export default FileList;
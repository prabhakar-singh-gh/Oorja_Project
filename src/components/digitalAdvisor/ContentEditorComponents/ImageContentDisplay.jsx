import React, { useState, useRef, useEffect } from 'react';

const ImageContentDisplay = ({ handleSave, initialValue }) => {
  const [imageTitle, setImageTitle] = useState(initialValue?.title || '');
  const [imageFile, setImageFile] = useState(initialValue?.image || null);
  const [imageDescription, setImageDescription] = useState(initialValue?.description || '');

  const containerRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file)); // Create URL to display the uploaded image
    }
  };

  // Handle auto-save when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        if (imageTitle && imageFile && imageDescription) {
          handleSave({
            title: imageTitle,
            image: imageFile,
            description: imageDescription,
          });
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [imageTitle, imageFile, imageDescription, handleSave]);

  return (
    <div ref={containerRef} className="border p-4 rounded-lg">
      {/* Image Title Input */}
      <div className="mb-4">
        <input
          type="text"
          value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)}
          placeholder="Enter Image Title"
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* Image Upload Box */}
      <div className="mb-4 border-dashed border-2 border-gray-300 p-6 text-center">
        {imageFile ? (
          <img src={imageFile} alt="Uploaded" className="w-full h-[10%]" />
        ) : (
          <div className="text-gray-500">
            <p>Drag & Drop or Click to Upload Image</p>
            <input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mt-2 inline-block"
            >
              Upload Image
            </label>
          </div>
        )}
      </div>

      {/* Image Description Input */}
      <div className="mb-4">
        <textarea
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}
          placeholder="Enter Image Description"
          className="w-full border p-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default ImageContentDisplay;

import { Upload, X } from 'lucide-react';

const StepImages = ({ images, handleImageUpload, removeImage, error }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Images <span className="text-red-500">*</span></label>
        <div className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition 
        cursor-pointer   ${error?.images ? 'border-red-500' : 'border-gray-300'}`}>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 font-semibold">Click to upload images</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
          </label>
        </div>
        {error?.images && (
            <p className="text-red-500 text-sm mt-1">{error.images}</p>
          )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative group">
              <img src={img} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepImages;

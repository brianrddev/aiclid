import React from 'react';

// Define the structure for an image option
interface ImageOption {
  name: string;
  path: string;
}

// List of available images in the public/puzzle_images directory
// NOTE: This needs to be manually maintained or generated during build if possible.
const availableImages: ImageOption[] = [
  { name: 'Basófilo', path: '/puzzle_images/basofilo.png' },
  { name: 'Eosinófilo', path: '/puzzle_images/eosinofilo.png' },
  { name: 'Eritrocito', path: '/puzzle_images/eritrocito.png' },
  { name: 'Linfocito', path: '/puzzle_images/linfocito.png' },
  { name: 'Monocito', path: '/puzzle_images/monocito.png' },
  { name: 'Neutrófilo', path: '/puzzle_images/neutrofilo.png' },
];

interface ImageSelectorProps {
  selectedImagePath: string | null;
  onImageSelect: (image: ImageOption) => void;
}

/**
 * Component for selecting the puzzle image.
 * Displays available images and allows the user to choose one.
 */
const ImageSelector: React.FC<ImageSelectorProps> = ({
  selectedImagePath,
  onImageSelect,
}) => {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-lg font-semibold text-white">
        Selecciona una Imagen:
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {availableImages.map((image) => (
          <button
            key={image.path}
            onClick={() => onImageSelect(image)}
            className={`transform rounded-lg border-2 p-2 transition duration-200 ease-in-out hover:scale-105 ${
              selectedImagePath === image.path
                ? 'border-blue-500 ring-2 ring-blue-500'
                : 'border-gray-600 hover:border-gray-400'
            }`}
          >
            <img
              src={image.path}
              alt={image.name}
              className="mb-2 h-24 w-full rounded object-cover"
            />
            <span className="block text-center text-sm text-white">
              {image.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;

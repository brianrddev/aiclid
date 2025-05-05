import React from 'react';
import { TileState } from '../../utils/puzzleUtils';
import { motion } from 'framer-motion';

interface PuzzleTileProps {
  tile: TileState;
  gridSize: number;
  imagePath: string;
  imageWidth: number; // Actual width of the image file
  imageHeight: number; // Actual height of the image file
  boardSize: number; // Display size of the board in pixels
  onClick: (tileIndex: number) => void;
  isEmpty: boolean;
  isSolved: boolean; // Add prop to indicate if puzzle is solved
}

/**
 * Component representing a single tile in the puzzle grid.
 * Handles displaying the image slice or being an empty space.
 */
const PuzzleTile: React.FC<PuzzleTileProps> = ({
  tile,
  gridSize,
  imagePath,
  boardSize,
  onClick,
  isEmpty,
  isSolved, // Use the prop
}) => {
  const tileDisplaySize = boardSize / gridSize; // Size of the tile displayed on screen

  // Calculate the background size needed to cover the entire grid display area
  const backgroundWidth = boardSize;
  const backgroundHeight = boardSize; // Keep it square for simplicity or adjust aspect ratio if needed
  // const backgroundHeight = (boardSize * imageHeight) / imageWidth; // Maintain aspect ratio if image isn't square

  // Calculate the correct background position for this tile based on its *original* value
  // This ensures the correct slice of the image is shown, scaled to the display size.
  const correctCol = tile.value % gridSize;
  const correctRow = Math.floor(tile.value / gridSize);
  const backgroundPositionX = -(correctCol * tileDisplaySize);
  const backgroundPositionY = -(correctRow * tileDisplaySize);

  const tileStyle: React.CSSProperties = isEmpty
    ? {
        width: `${tileDisplaySize}px`,
        height: `${tileDisplaySize}px`,
        backgroundColor: '#374151', // Dark gray for empty slot
        border: '1px solid #4b5563', // Slightly lighter border
      }
    : {
        width: `${tileDisplaySize}px`,
        height: `${tileDisplaySize}px`,
        backgroundImage: `url(${imagePath})`,
        backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
        // Use the newly calculated display-based background position
        backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
        border: '1px solid #4b5563',
        cursor: isSolved ? 'default' : 'pointer', // Change cursor when solved
        overflow: 'hidden', // Hide parts of the image outside the tile
      };

  // Calculate the target position based on the tile's current index in the grid
  const targetRow = Math.floor(tile.index / gridSize);
  const targetCol = tile.index % gridSize;
  const targetX = targetCol * tileDisplaySize;
  const targetY = targetRow * tileDisplaySize;

  return (
    <motion.div
      layout // Animate layout changes
      initial={false} // Don't animate initial render
      animate={{ x: targetX, y: targetY }} // Animate to the target position
      transition={{ type: 'spring', stiffness: 300, damping: 30 }} // Smooth spring animation
      style={{
        ...tileStyle,
        position: 'absolute', // Position absolutely within the board container
        left: 0, // Initial left offset (will be animated by `x`)
        top: 0, // Initial top offset (will be animated by `y`)
      }}
      // Disable onClick if the tile is empty OR the puzzle is solved
      onClick={() => !isEmpty && !isSolved && onClick(tile.index)}
      className="box-border rounded-sm shadow-md" // Basic styling
    >
      {/* Optional: Display tile number for debugging */}
      {/* {!isEmpty && <span className="absolute bottom-0 right-1 text-xs text-white bg-black bg-opacity-50 px-1 rounded">{tile.value + 1}</span>} */}
    </motion.div>
  );
};

export default PuzzleTile;

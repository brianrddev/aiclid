import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  TileState,
  generateSolvedPuzzle,
  shufflePuzzle,
  isPuzzleSolved,
  saveResult,
  GameResult,
} from '../../utils/puzzleUtils';
import PuzzleTile from './PuzzleTile';
import Timer from './Timer';

interface PuzzleBoardProps {
  gridSize: number;
  imageOption: { name: string; path: string };
  playerName: string;
  onSolve: (result: GameResult) => void; // Callback when solved
  boardDisplaySize?: number; // Optional: control the display size in pixels
}

const EMPTY_SLOT_VALUE = -1; // Consistent empty slot representation

/**
 * The main component for the puzzle game board.
 * Manages tile state, movement logic, solving check, and timer integration.
 */
const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  gridSize,
  imageOption,
  playerName,
  onSolve,
  boardDisplaySize = 400, // Default display size (e.g., 400px)
}) => {
  const [tiles, setTiles] = useState<TileState[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ref to track if the component is mounted to avoid state updates after unmount
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Effect to load image dimensions and initialize/shuffle the puzzle
  useEffect(() => {
    setIsLoading(true);
    setIsSolved(false);
    setTimerRunning(false); // Ensure timer is stopped initially
    setElapsedTime(0); // Reset time

    const img = new Image();
    img.onload = () => {
      if (!isMounted.current) return; // Check if component is still mounted

      setImageDimensions({ width: img.width, height: img.height });
      const solvedState = generateSolvedPuzzle(gridSize);
      const shuffledState = shufflePuzzle(solvedState, gridSize);
      setTiles(shuffledState);
      setIsLoading(false);
      setTimerRunning(true); // Start timer only after setup is complete
    };
    img.onerror = () => {
      if (!isMounted.current) return;
      console.error('Failed to load image:', imageOption.path);
      // Handle image loading error (e.g., show a message)
      setIsLoading(false);
    };
    img.src = imageOption.path;

    // Cleanup function for image loading
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [gridSize, imageOption.path]); // Re-initialize when grid size or image changes

  // Callback to handle tile clicks
  const handleTileClick = useCallback(
    (clickedIndex: number) => {
      if (isSolved || isLoading) return; // Don't move tiles if solved or loading

      const emptyTileIndex = tiles.findIndex(
        (tile) => tile.value === EMPTY_SLOT_VALUE
      );
      if (emptyTileIndex === -1) return; // Should not happen

      const N = gridSize;
      const clickedTile = tiles.find((tile) => tile.index === clickedIndex);
      const emptyTile = tiles.find((tile) => tile.value === EMPTY_SLOT_VALUE);

      if (!clickedTile || !emptyTile) return; // Should not happen

      const clickedRow = Math.floor(clickedTile.index / N);
      const clickedCol = clickedTile.index % N;
      const emptyRow = Math.floor(emptyTile.index / N);
      const emptyCol = emptyTile.index % N;

      // Check if the clicked tile is adjacent to the empty slot
      const isAdjacent =
        (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
        (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow);

      if (isAdjacent) {
        // Swap the *indices* (physical positions) of the clicked tile and the empty tile
        const newTiles = tiles.map((tile) => {
          if (tile.value === clickedTile.value) {
            return { ...tile, index: emptyTile.index }; // Move clicked tile to empty slot index
          }
          if (tile.value === emptyTile.value) {
            return { ...tile, index: clickedTile.index }; // Move empty slot to clicked tile index
          }
          return tile;
        });

        setTiles(newTiles);

        // Check if the puzzle is solved after the move
        if (isPuzzleSolved(newTiles)) {
          if (!isMounted.current) return; // Check mount status before state update
          setIsSolved(true);
          setTimerRunning(false);
          const result: GameResult = {
            name: playerName,
            imageName: imageOption.name,
            imagePath: imageOption.path,
            difficulty: gridSize,
            time: elapsedTime, // Use the latest time from the timer
            date: new Date().toISOString(),
          };
          saveResult(result);
          onSolve(result); // Notify parent component
        }
      }
    },
    [
      tiles,
      gridSize,
      isSolved, // Include isSolved in dependencies
      isLoading,
      playerName,
      imageOption,
      elapsedTime,
      onSolve,
    ]
  );

  // Callback for the Timer component to update elapsed time
  const handleTimerUpdate = useCallback((seconds: number) => {
    setElapsedTime(seconds);
  }, []);

  if (isLoading || !imageDimensions) {
    return (
      <div className="flex h-64 items-center justify-center text-white">
        Cargando puzzle...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Timer Display */}
      <div className="mb-4">
        <Timer
          isRunning={timerRunning}
          onTimerUpdate={handleTimerUpdate}
          resetKey={`${gridSize}-${imageOption.path}`} // Reset timer if grid/image changes
        />
      </div>

      {/* Puzzle Grid */}
      <div
        className="relative rounded-md bg-gray-800 shadow-lg"
        style={{
          width: `${boardDisplaySize}px`,
          height: `${boardDisplaySize}px`,
        }}
      >
        {tiles.map((tile) => (
          <PuzzleTile
            key={tile.value} // Use the original value as the key
            tile={tile}
            gridSize={gridSize}
            imagePath={imageOption.path}
            imageWidth={imageDimensions.width}
            imageHeight={imageDimensions.height}
            boardSize={boardDisplaySize}
            onClick={handleTileClick}
            isEmpty={tile.value === EMPTY_SLOT_VALUE}
            isSolved={isSolved} // Pass the isSolved state to the tile
          />
        ))}
      </div>
    </div>
  );
};

export default PuzzleBoard;

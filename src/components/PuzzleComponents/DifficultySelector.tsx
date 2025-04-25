import React from 'react';

// Define available difficulty levels (grid sizes)
const difficultyOptions: number[] = [2, 3, 4, 5]; // Represents 2x2, 3x3, 4x4, 5x5

interface DifficultySelectorProps {
  selectedDifficulty: number | null;
  onDifficultySelect: (difficulty: number) => void;
}

/**
 * Component for selecting the puzzle difficulty (grid size).
 */
const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onDifficultySelect,
}) => {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-lg font-semibold text-white">
        Selecciona la Dificultad:
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {difficultyOptions.map((size) => (
          <button
            key={size}
            onClick={() => onDifficultySelect(size)}
            className={`rounded px-4 py-2 font-medium transition duration-200 ease-in-out ${
              selectedDifficulty === size
                ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {size} × {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;

import React, { useState, useCallback } from 'react';
import ImageSelector from '../components/PuzzleComponents/ImageSelector';
import DifficultySelector from '../components/PuzzleComponents/DifficultySelector';
import NameInput from '../components/PuzzleComponents/NameInput';
import PuzzleBoard from '../components/PuzzleComponents/PuzzleBoard';
import { GameResult, loadResults } from '../utils/puzzleUtils'; // Import loadResults
import { Link } from 'react-router-dom'; // Import Link for navigation

// Define possible game states
type GamePhase = 'setup' | 'playing' | 'solved';

/**
 * Page component for the Sliding Puzzle game.
 * Manages the overall game flow: setup, playing, and solved states.
 */
const PuzzlePage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{
    name: string;
    path: string;
  } | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(
    null
  );
  const [playerName, setPlayerName] = useState<string>('');
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [lastResult, setLastResult] = useState<GameResult | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false); // State to toggle results view
  const [allResults, setAllResults] = useState<GameResult[]>([]); // State to hold all results

  // Check if all setup options are selected
  const canStartGame = selectedImage && selectedDifficulty && playerName.trim();

  // Handler to start the game
  const handleStartGame = () => {
    if (canStartGame) {
      setGamePhase('playing');
      setLastResult(null); // Clear previous result when starting new game
      setShowResults(false); // Hide results when starting a new game
    }
  };

  // Handler for when the puzzle is solved
  const handlePuzzleSolved = useCallback((result: GameResult) => {
    setGamePhase('solved'); // Keep the board visible but mark as solved
    setLastResult(result);
    // Optionally load all results here if needed immediately after solve
    // setAllResults(loadResults());
  }, []);

  // Handler to start a new game after solving
  const handlePlayAgain = () => {
    setGamePhase('setup');
    // Optionally reset selections or keep them
    // setSelectedImage(null);
    // setSelectedDifficulty(null);
    // setPlayerName('');
    setLastResult(null);
    setShowResults(false);
  };

  // Handler to toggle the display of all saved results
  const handleToggleResults = () => {
    if (!showResults) {
      // Load results only when showing them
      setAllResults(loadResults().sort((a, b) => b.time - a.time)); // Sort by time desc
    }
    setShowResults(!showResults);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-900 p-4 pt-10 text-white">
      <Link
        to="/"
        className="absolute top-4 left-4 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        ← Volver
      </Link>
      <h1 className="mb-8 text-3xl font-bold text-cyan-400 md:text-4xl">
        Puzzle Deslizante
      </h1>

      {/* Setup Phase */}
      {gamePhase === 'setup' && (
        <div className="w-full max-w-lg rounded-lg bg-gray-800 p-6 shadow-xl">
          <ImageSelector
            selectedImagePath={selectedImage?.path ?? null}
            onImageSelect={setSelectedImage}
          />
          <DifficultySelector
            selectedDifficulty={selectedDifficulty}
            onDifficultySelect={setSelectedDifficulty}
          />
          <NameInput name={playerName} onNameChange={setPlayerName} />
          <button
            onClick={handleStartGame}
            disabled={!canStartGame}
            className={`w-full rounded px-6 py-3 text-lg font-semibold transition duration-200 ease-in-out ${
              canStartGame
                ? 'bg-green-600 hover:bg-green-700'
                : 'cursor-not-allowed bg-gray-600'
            }`}
          >
            ¡Empezar Juego!
          </button>
        </div>
      )}

      {/* Playing OR Solved Phase - Show board in both */}
      {(gamePhase === 'playing' || gamePhase === 'solved') &&
        selectedImage &&
        selectedDifficulty && (
          <PuzzleBoard
            gridSize={selectedDifficulty}
            imageOption={selectedImage}
            playerName={playerName}
            onSolve={handlePuzzleSolved}
            boardDisplaySize={
              window.innerWidth < 640 ? window.innerWidth - 40 : 400
            } // Adjust board size for smaller screens
          />
        )}

      {/* Post-Game Options (visible only when solved) */}
      {gamePhase === 'solved' && lastResult && (
        <div className="mt-6 flex flex-col items-center gap-4">
          {/* Display confirmation message */}
          <div className="rounded bg-green-600 p-4 text-center text-white shadow-md">
            <h3 className="text-xl font-bold">¡Puzzle Resuelto!</h3>
            <p>
              ¡Felicidades, {lastResult.name}! Completaste el puzzle de{' '}
              {lastResult.difficulty}×{lastResult.difficulty} en{' '}
              {lastResult.time} segundos.
            </p>
          </div>
          <button
            onClick={handlePlayAgain}
            className="rounded bg-blue-600 px-6 py-2 text-lg font-semibold transition hover:bg-blue-700"
          >
            Jugar de Nuevo
          </button>
        </div>
      )}

      {/* Button to Show/Hide All Results (visible always after first game potentially) */}
      {(gamePhase === 'solved' || gamePhase === 'setup') && (
        <div className="mt-8">
          <button
            onClick={handleToggleResults}
            className="rounded bg-purple-600 px-6 py-2 font-semibold transition hover:bg-purple-700"
          >
            {showResults ? 'Ocultar' : 'Mostrar'} Resultados Guardados
          </button>
        </div>
      )}

      {/* Display All Results Section */}
      {showResults && (
        <div className="mt-6 w-full max-w-2xl rounded-lg bg-gray-800 p-4 shadow-lg">
          <h2 className="mb-4 text-center text-xl font-semibold">
            Resultados Guardados
          </h2>
          {allResults.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-[#444] [&::-webkit-scrollbar-track]:bg-[#222]">
              {allResults.map((res, index) => (
                <li
                  key={index}
                  className="mb-2 rounded border border-gray-700 bg-gray-700 p-3 text-sm"
                >
                  <span className="font-semibold">{res.name}</span> - Imagen:{' '}
                  {res.imageName} ({res.difficulty}×{res.difficulty}) - Tiempo:{' '}
                  <span className="font-bold">{res.time}s</span> (
                  {new Date(res.date).toLocaleDateString()})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400">
              No hay resultados guardados todavía.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PuzzlePage;

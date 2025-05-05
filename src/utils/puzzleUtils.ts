/**
 * Represents the state of a single puzzle tile.
 */
export interface TileState {
  value: number; // The original index (0 to N*N-1) of the tile, N*N-1 represents the empty slot
  index: number; // The current position (0 to N*N-1) in the grid
}

/**
 * Represents the structure for saving game results.
 */
export interface GameResult {
  name: string;
  imageName: string;
  imagePath: string;
  difficulty: number; // Grid size (e.g., 3 for 3x3)
  time: number; // Time in seconds
  date: string; // ISO timestamp
}

const EMPTY_SLOT_VALUE = -1; // Use -1 to clearly represent the empty slot internally

/**
 * Generates the initial solved state of the puzzle grid.
 * Only stores the value and initial index.
 * @param gridSize - The size of the grid (e.g., 3 for 3x3).
 * @returns An array representing the solved puzzle state.
 */
export const generateSolvedPuzzle = (gridSize: number): TileState[] => {
  const totalTiles = gridSize * gridSize;
  const tiles: TileState[] = [];

  for (let i = 0; i < totalTiles; i++) {
    const value = i === totalTiles - 1 ? EMPTY_SLOT_VALUE : i; // Last tile is empty
    tiles.push({
      value: value,
      index: i, // Initial index matches the value's correct position
    });
  }
  return tiles;
};

/**
 * Checks if a given puzzle state is solvable.
 * Based on inversion count and empty slot position.
 * @param tiles - The current order of tile values (EMPTY_SLOT_VALUE for empty).
 * @param gridSize - The size of the grid.
 * @returns True if the puzzle is solvable, false otherwise.
 */
const isSolvable = (tiles: number[], gridSize: number): boolean => {
  let inversions = 0;
  const N = gridSize;
  const emptySlotValue = EMPTY_SLOT_VALUE;

  // Create a flat array of values, excluding the empty slot for inversion count
  const valueArray = tiles.filter((val) => val !== emptySlotValue);

  for (let i = 0; i < valueArray.length; i++) {
    for (let j = i + 1; j < valueArray.length; j++) {
      if (valueArray[i] > valueArray[j]) {
        inversions++;
      }
    }
  }

  // Find the row of the empty slot (from the bottom, 1-based)
  const emptyIndex = tiles.indexOf(emptySlotValue);
  const emptyRow = Math.floor(emptyIndex / N);
  const emptyRowFromBottom = N - emptyRow;

  if (N % 2 !== 0) {
    // Odd grid size: solvable if inversions are even
    return inversions % 2 === 0;
  } else {
    // Even grid size: solvable if (inversions + empty row from bottom) is odd
    return (inversions + emptyRowFromBottom) % 2 !== 0;
  }
};

/**
 * Checks if the current puzzle state is solved.
 * Compares each tile's value to its current index.
 * @param currentTiles - The current state of the puzzle tiles.
 * @returns True if the puzzle is solved, false otherwise.
 */
export const isPuzzleSolved = (currentTiles: TileState[]): boolean => {
  for (let i = 0; i < currentTiles.length; i++) {
    const tile = currentTiles[i];
    // Check if the tile's value matches its current physical index
    // The empty slot should be at the last index (length - 1)
    const expectedValue =
      tile.index === currentTiles.length - 1 ? EMPTY_SLOT_VALUE : tile.index;
    if (tile.value !== expectedValue) {
      return false;
    }
  }
  return true;
};

/**
 * Shuffles the puzzle tiles randomly while ensuring solvability and not starting solved.
 * Starts with the solved state and performs random valid moves by swapping indices.
 * @param initialTiles - The solved puzzle state.
 * @param gridSize - The size of the grid.
 * @param shuffleMoves - The number of random moves to perform for shuffling.
 * @returns A shuffled array of tile states.
 */
export const shufflePuzzle = (
  initialTiles: TileState[],
  gridSize: number,
  shuffleMoves = gridSize * gridSize * 10 // Number of random moves
): TileState[] => {
  const N = gridSize;

  const performShuffle = (): TileState[] => {
    let currentTiles = [...initialTiles]; // Start fresh for each shuffle attempt
    let emptyTile = currentTiles.find((t) => t.value === EMPTY_SLOT_VALUE);
    if (!emptyTile) {
      console.error('Empty slot not found in initial tiles!');
      return initialTiles; // Return original if error
    }
    let currentEmptyPhysicalIndex = emptyTile.index; // The physical position of the empty slot

    const getValidMoves = (currentIndex: number): number[] => {
      const validMoves: number[] = [];
      const row = Math.floor(currentIndex / N);
      const col = currentIndex % N;

      // Check move up
      if (row > 0) validMoves.push(currentIndex - N);
      // Check move down
      if (row < N - 1) validMoves.push(currentIndex + N);
      // Check move left
      if (col > 0) validMoves.push(currentIndex - 1);
      // Check move right
      if (col < N - 1) validMoves.push(currentIndex + 1);

      return validMoves;
    };

    for (let i = 0; i < shuffleMoves; i++) {
      const validPhysicalMoves = getValidMoves(currentEmptyPhysicalIndex);
      if (validPhysicalMoves.length === 0) continue; // Should not happen in a valid grid

      const randomTargetPhysicalIndex =
        validPhysicalMoves[
          Math.floor(Math.random() * validPhysicalMoves.length)
        ];

      // Find the logical indices of the tiles to swap based on their current physical indices
      const emptyLogicalIndex = currentTiles.findIndex(
        (t) => t.index === currentEmptyPhysicalIndex
      );
      const targetLogicalIndex = currentTiles.findIndex(
        (t) => t.index === randomTargetPhysicalIndex
      );

      if (emptyLogicalIndex === -1 || targetLogicalIndex === -1) {
        console.error('Could not find tiles for swapping indices.');
        continue; // Skip move if error
      }

      // Swap the *indices* (physical positions) of the empty tile and the target tile
      currentTiles[emptyLogicalIndex].index = randomTargetPhysicalIndex;
      currentTiles[targetLogicalIndex].index = currentEmptyPhysicalIndex;

      // Update the current physical index of the empty slot
      currentEmptyPhysicalIndex = randomTargetPhysicalIndex;
    }
    return currentTiles;
  };

  let shuffledTiles = performShuffle();

  // Verify solvability based on the final *indices* (physical positions)
  const finalBoardState: number[] = Array(N * N).fill(0);
  shuffledTiles.forEach((tile) => {
    finalBoardState[tile.index] = tile.value;
  });

  // Ensure the puzzle is solvable AND not already solved
  while (
    !isSolvable(finalBoardState, gridSize) ||
    isPuzzleSolved(shuffledTiles)
  ) {
    console.warn(
      'Generated an unsolvable or already solved puzzle state, reshuffling...'
    );
    shuffledTiles = performShuffle(); // Re-shuffle
    // Recalculate finalBoardState for the new shuffle
    shuffledTiles.forEach((tile) => {
      finalBoardState[tile.index] = tile.value;
    });
  }

  return shuffledTiles;
};

/**
 * Saves the game result to localStorage.
 * @param result - The game result object to save.
 */
// --- LOCALSTORAGE IMPLEMENTATION ---
export const saveResult = (result: GameResult): void => {
  try {
    const existingResults = localStorage.getItem('puzzleResults');
    const results: GameResult[] = existingResults
      ? JSON.parse(existingResults)
      : [];
    results.push(result);
    // Optional: Sort results or limit the number stored
    localStorage.setItem('puzzleResults', JSON.stringify(results));
    console.log('Result saved to localStorage:', result);
  } catch (error) {
    console.error('Failed to save result to localStorage:', error);
  }
};

/**
 * Loads game results from localStorage.
 * @returns An array of saved game results.
 */
// --- LOCALSTORAGE IMPLEMENTATION ---
export const loadResults = (): GameResult[] => {
  try {
    const existingResults = localStorage.getItem('puzzleResults');
    return existingResults ? JSON.parse(existingResults) : [];
  } catch (error) {
    console.error('Failed to load results from localStorage:', error);
    return [];
  }
};

// --- BACKEND INTEGRATION CODE (Conceptual - Uncomment and adapt when backend is ready) ---

/*
// Interface for defining filter/sort parameters when fetching results from backend
interface FetchResultsParams {
  difficulty?: number;
  imageName?: string;
  sortBy?: 'time' | 'date';
  order?: 'asc' | 'desc';
  limit?: number;
}

// Base URL for your backend API - REPLACE WITH YOUR ACTUAL API URL
const API_BASE_URL = '/api'; // Example: 'http://localhost:3001/api' or just '/api' if using proxy

*/

/**
 * Saves the game result to the backend database via API.
 * @param result - The game result object to save.
 */
/*
export const saveResult = async (result: GameResult): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/results`, { // Endpoint to save results
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    });

    if (!response.ok) {
      // Log detailed error response if possible
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    // Optionally process the response from the server (e.g., confirmation ID)
    const savedResult = await response.json();
    console.log('Result saved to database:', savedResult);

  } catch (error) {
    console.error('Failed to save result to database:', error);
    // Optional: Implement a fallback mechanism (e.g., notify user, try again later)
    // alert('Error al guardar el resultado. Inténtalo de nuevo más tarde.');
  }
};
*/

/**
 * Loads game results from the backend database via API, allowing filtering and sorting.
 * @param params - Optional parameters for filtering and sorting results.
 * @returns An array of saved game results.
 */
/*
export const loadResults = async (params: FetchResultsParams = {}): Promise<GameResult[]> => {
  try {
    // Build the query string from parameters
    const query = new URLSearchParams();
    if (params.difficulty) query.append('difficulty', params.difficulty.toString());
    if (params.imageName) query.append('imageName', params.imageName);
    if (params.sortBy) query.append('sortBy', params.sortBy);
    if (params.order) query.append('order', params.order);
    if (params.limit) query.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/results?${query.toString()}`); // Endpoint to fetch results

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    const results: GameResult[] = await response.json();
    console.log(`Loaded ${results.length} results from database.`);
    return results;

  } catch (error) {
    console.error('Failed to load results from database:', error);
    // Optional: Notify user about the error
    // alert('Error al cargar los resultados.');
    return []; // Return empty array on error
  }
};
*/

import './App.css';
import { Routes, Route } from 'react-router-dom';
import PuzzlePage from './pages/PuzzlePage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/puzzle" element={<PuzzlePage />} />
    </Routes>
  );
}

export default App;

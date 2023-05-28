// import logo from './logo.svg';
import './App.css';
import Game from './Components/Game/Game';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResultPage from './Components/Result/Result';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;

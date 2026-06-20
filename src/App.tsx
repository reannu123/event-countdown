import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Shared from './pages/Shared';

function App() {
  return (
    <div className="dark">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/c/:code" element={<Shared />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

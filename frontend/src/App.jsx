import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FocusArea from './pages/FocusArea';
import SessionPreview from './pages/SessionPreview';
import ActiveSession from './pages/ActiveSession';
import AiCuration from './pages/AiCuration';
import History from './pages/History';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/focus-area" element={<FocusArea />} />
        <Route path="/preview" element={<SessionPreview />} />
        <Route path="/active-session" element={<ActiveSession />} />
        <Route path="/ai-curation" element={<AiCuration />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;

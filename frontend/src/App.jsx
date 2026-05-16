import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FocusArea from './pages/FocusArea';
import SessionPreview from './pages/SessionPreview';
import ActiveSession from './pages/ActiveSession';
import History from './pages/History';
import Routine from './pages/Routine';
import CustomWorkout from './pages/CustomWorkout';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/focus-area" element={<FocusArea />} />
          <Route path="/routine/:id" element={<Routine />} />
          <Route path="/custom-workout" element={<CustomWorkout />} />
          <Route path="/preview" element={<SessionPreview />} />
          <Route path="/active-session" element={<ActiveSession />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

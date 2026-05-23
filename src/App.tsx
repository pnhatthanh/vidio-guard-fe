import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import LibraryPage from './pages/LibraryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AnalysisDetailPage from './pages/AnalysisDetailPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Protected Routes (mocked) */}
        <Route path="/dashboard" element={<Navigate to="/upload" replace />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/analytics/:id" element={<AnalyticsPage />} />
        <Route path="/analysis/:id" element={<AnalysisDetailPage />} />
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

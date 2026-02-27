import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import DashboardLayout from './components/DashboardLayout';

import Dashboard from './pages/Dashboard';

import Assessments from './pages/Assessments';
import Results from './pages/Results';

import Practice from './pages/Practice';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import TestChecklist from './pages/TestChecklist';
import Ship from './pages/Ship';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/results" element={<Results />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/prp/07-test" element={<TestChecklist />} />
          <Route path="/prp/08-ship" element={<Ship />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

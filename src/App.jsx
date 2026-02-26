import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import DashboardLayout from './components/DashboardLayout';

import Dashboard from './pages/Dashboard';

// Placeholder components for dashboard routes
const Practice = () => <div><h1 className="text-3xl font-bold mb-4">Practice Arena</h1><p className="text-gray-600">Solve coding challenges to improve your skills.</p></div>;
const Assessments = () => <div><h1 className="text-3xl font-bold mb-4">Active Assessments</h1><p className="text-gray-600">Take tests to evaluate your readiness.</p></div>;
const Resources = () => <div><h1 className="text-3xl font-bold mb-4">Study Resources</h1><p className="text-gray-600">Access guides, tutorials, and interview tips.</p></div>;
const Profile = () => <div><h1 className="text-3xl font-bold mb-4">Your Profile</h1><p className="text-gray-600">Manage your account and personalized settings.</p></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

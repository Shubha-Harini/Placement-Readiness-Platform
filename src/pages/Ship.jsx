import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Rocket, Box, Check, Cpu } from 'lucide-react';

const Ship = () => {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('prp_test_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const isLocked = completedCount < 10; // Must have exactly 10 tests passed

  if (isLocked) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-10 max-w-2xl mx-auto mt-10">
        <Card className="border-red-100 shadow-md">
          <CardHeader className="bg-red-50/50 border-b border-red-100 flex flex-col items-center text-center py-10">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
              <Box size={36} />
            </div>
            <CardTitle className="text-2xl text-red-900">Shipment Locked</CardTitle>
            <CardDescription className="text-base text-red-700/80 mt-2 max-w-sm">
              You must pass all 10 Quality Assurance tests before accessing the shipping bay.
              Currently at {completedCount} / 10.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 text-center flex justify-center">
            <button
              onClick={() => navigate('/prp/07-test')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-sm transition-colors text-lg"
            >
              Return to Test Suite
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 max-w-4xl mx-auto mt-10">
      <div className="text-center space-y-4">
        <div className="inline-flex w-24 h-24 bg-green-100 text-green-600 rounded-full items-center justify-center mb-2 shadow-sm border-4 border-white">
          <Rocket size={48} />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-gray-900">Ready for Launch</h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto font-medium">
          All systems are verified, tested, and rock solid. The Placement Readiness Platform is ready to scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <Card className="border-green-100 bg-green-50/20 shadow-sm relative overflow-hidden group hover:border-green-300 transition-colors cursor-pointer">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Cpu size={120} />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-6">
              <Check size={28} strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Deploy Validation Subsystem</h2>
            <p className="text-gray-600 font-medium">Finalize the CI/CD pipeline push for the local storage and extraction engines.</p>
          </CardContent>
        </Card>

        <Card className="border-indigo-100 bg-indigo-50/20 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-colors cursor-pointer">
          <div className="absolute -bottom-10 -right-10 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-indigo-900">
            <Rocket size={150} />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center mb-6 shadow-xs">
              <Rocket size={24} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ship Production V1.0</h2>
            <p className="text-gray-600 font-medium">Merge to main branch and automatically cut the rigorous initial release to Vercel.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Ship;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { CheckSquare, AlertTriangle, CheckCircle2, RefreshCw, Lock, ShieldCheck } from 'lucide-react';

const TestChecklist = () => {
  const navigate = useNavigate();

  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('prp_test_checklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse checklist", e);
      }
    }
    return {
      jdRequired: false,
      shortJDWarn: false,
      skillsGroup: false,
      roundMap: false,
      scoreDeterministic: false,
      scoreToggles: false,
      persistRefresh: false,
      historyLoad: false,
      exportButtons: false,
      noConsoleErrors: false
    };
  });

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('prp_test_checklist', JSON.stringify(checklist));
  }, [checklist]);

  const handleToggle = (key) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleReset = () => {
    const resetState = Object.keys(checklist).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setChecklist(resetState);
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;
  const isComplete = completedCount === totalCount;

  const testItems = [
    { key: 'jdRequired', text: "JD required validation works", hint: "Submit empty JD on Assessments page." },
    { key: 'shortJDWarn', text: "Short JD warning shows for <200 chars", hint: "Paste a short sentence and see amber warning." },
    { key: 'skillsGroup', text: "Skills extraction groups correctly", hint: "Ensure Core CS, Web, Data split properly." },
    { key: 'roundMap', text: "Round mapping changes based on company + skills", hint: "Compare 'Google' vs empty company." },
    { key: 'scoreDeterministic', text: "Score calculation is deterministic", hint: "Same JD always returns the exact same baseScore." },
    { key: 'scoreToggles', text: "Skill toggles update score live", hint: "Click 'I know' -> 'Need practice' and watch X/100 drop." },
    { key: 'persistRefresh', text: "Changes persist after refresh", hint: "Change a toggle, hit F5, verify finalScore stuck." },
    { key: 'historyLoad', text: "History saves and loads correctly", hint: "Corruption check works and shows robustly in Recent items." },
    { key: 'exportButtons', text: "Export buttons copy the correct content", hint: "Click copy and paste in notepad." },
    { key: 'noConsoleErrors', text: "No console errors on core pages", hint: "Check F12 Developer Tools across the flow." }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 max-w-4xl mx-auto">

      {/* Header Area */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Quality Assurance</h1>
        <p className="text-gray-500">Platform release checklist. Ensure total stability before shipping.</p>
      </div>

      {/* Top Summary Banner */}
      <div className={`p-6 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${isComplete ? 'bg-green-50/50 border-green-200' : 'bg-white border-gray-200 shadow-sm'
        }`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full flex items-center justify-center ${isComplete ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
            {isComplete ? <ShieldCheck size={32} /> : <CheckSquare size={32} />}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Tests Passed: {completedCount} / {totalCount}
            </h2>
            {isComplete ? (
              <p className="text-green-600 font-medium text-sm mt-1">All systems verified and stable. Ready to ship!</p>
            ) : (
              <p className="text-amber-600 font-medium text-sm mt-1 flex items-center gap-1.5"><AlertTriangle size={14} /> Fix issues before shipping.</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleReset}
            className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2 flex-1 md:flex-none justify-center"
          >
            <RefreshCw size={14} /> Reset checklist
          </button>
          <button
            onClick={() => navigate('/prp/08-ship')}
            disabled={!isComplete}
            className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all flex-1 md:flex-none ${isComplete
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-md'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              }`}
          >
            {isComplete ? 'Proceed to Ship' : <><Lock size={14} /> Locked</>}
          </button>
        </div>
      </div>

      {/* Checklist Engine */}
      <Card>
        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
          <CardTitle className="text-lg">Pre-flight Validation Suite</CardTitle>
          <CardDescription>Physically verify each flow before checking off.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-gray-100">
          {testItems.map((item) => (
            <label
              key={item.key}
              className={`flex items-start gap-4 p-5 cursor-pointer transition-colors hover:bg-gray-50/50 group ${checklist[item.key] ? 'bg-green-50/20' : ''
                }`}
            >
              <div className="pt-0.5 shrink-0 relative">
                <input
                  type="checkbox"
                  checked={checklist[item.key]}
                  onChange={() => handleToggle(item.key)}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20 transition-all cursor-pointer peer appearance-none"
                />
                <div className={`absolute inset-0 border-2 rounded w-5 h-5 pointer-events-none flex items-center justify-center transition-colors ${checklist[item.key] ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary/50'
                  }`}>
                  {checklist[item.key] && <CheckCircle2 size={16} className="text-white fill-primary" strokeWidth={3} />}
                </div>
              </div>
              <div>
                <span className={`text-base font-semibold block mb-0.5 transition-colors ${checklist[item.key] ? 'text-gray-900 line-through decoration-gray-300 decoration-2' : 'text-gray-900'
                  }`}>
                  {item.text}
                </span>
                <span className="text-sm text-gray-500">{item.hint}</span>
              </div>
            </label>
          ))}
        </CardContent>
      </Card>

    </div>
  );
};

export default TestChecklist;

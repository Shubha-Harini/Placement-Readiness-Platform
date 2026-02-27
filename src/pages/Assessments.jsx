import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { analyzeJD } from '../lib/analyzer';
import { Briefcase, Building, FileText, History, Cpu, ChevronRight } from 'lucide-react';

const Assessments = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [warning, setWarning] = useState("");
  const [shortWarned, setShortWarned] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    jdText: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('jdHistory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validHistory = [];
          let hasCorruption = false;
          for (const item of parsed) {
            // Validate minimum required schema fields
            if (item && item.id && item.jdText && typeof item.finalScore === 'number') {
              validHistory.push(item);
            } else {
              hasCorruption = true;
            }
          }
          setHistory(validHistory);
          if (hasCorruption) {
            setWarning("One saved entry couldn't be loaded. Create a new analysis.");
          }
        }
      } catch (e) {
        setWarning("One saved entry couldn't be loaded. Create a new analysis.");
        setHistory([]);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'jdText') {
      setWarning("");
      setShortWarned(false);
    }
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    setWarning(""); // Clear warnings on submit

    if (!formData.jdText.trim()) {
      setWarning("Please paste a job description to analyze.");
      setShortWarned(false);
      return;
    }

    if (formData.jdText.trim().length < 200 && !shortWarned) {
      setWarning("This JD is too short to analyze deeply. Paste full JD for better output. Click analyze again to proceed anyway.");
      setShortWarned(true);
      return;
    }

    // Run Analyzer
    const result = analyzeJD(formData.company, formData.role, formData.jdText);

    // Save to LocalStorage
    const newHistory = [result, ...history];
    localStorage.setItem('jdHistory', JSON.stringify(newHistory));

    // Redirect to results explicitly
    console.log("Analysis Output Generated:", result.id);
    navigate(`/results?id=${result.id}`);
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Job Analyzer</h1>
          <p className="text-gray-500 mt-1">Paste a job description to extract skills and build a custom readiness plan.</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">

        {/* Input Form Column */}
        <div className="w-full space-y-6">
          <Card>
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="flex items-center gap-2">
                <FileText className="text-primary" size={20} />
                New Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAnalyze} className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Building size={16} className="text-gray-400" /> Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Google"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Briefcase size={16} className="text-gray-400" /> Target Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g. SDE II"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText size={16} className="text-gray-400" /> Job Description (Required)
                  </label>
                  <textarea
                    name="jdText"
                    value={formData.jdText}
                    onChange={handleChange}
                    placeholder="Paste the full job description here..."
                    className={`w-full border rounded-lg px-4 py-3 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${warning || (formData.jdText.trim().length > 0 && formData.jdText.trim().length < 200) ? 'border-amber-300 focus:border-amber-400 bg-amber-50/10' : 'border-gray-200 focus:border-primary'}`}
                  />
                  {warning ? (
                    <p className="text-sm text-red-500 font-medium animate-in fade-in pt-1">{warning}</p>
                  ) : formData.jdText.trim().length > 0 && formData.jdText.trim().length < 200 ? (
                    <p className="text-sm text-amber-600 font-medium animate-in fade-in pt-1">This JD is too short to analyze deeply. Paste full JD for better output.</p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Cpu size={18} />
                  Analyze Readiness
                </button>

              </form>
            </CardContent>
          </Card>
        </div>

        {/* History Column */}
        <div className="w-full mt-4">
          <Card className="h-full">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="flex items-center gap-2">
                <History className="text-primary" size={20} />
                Recent Analyses
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-0">
              {history.length === 0 ? (
                <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                  <History size={40} className="text-gray-200 mb-3" />
                  <p className="text-sm">No analysis history found.</p>
                  <p className="text-xs mt-1">Paste a JD to get started.</p>
                </div>
              ) : (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-gray-50/50">
                  {history.map((record) => (
                    <div
                      key={record.id}
                      onClick={() => navigate(`/results?id=${record.id}`)}
                      className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-primary/30 hover:shadow-md cursor-pointer transition-all group flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="font-bold text-gray-900 line-clamp-2 pr-2 leading-tight">
                          {record.role || 'General Role'}
                        </div>
                        <div className="shrink-0 flex items-center gap-1 text-primary font-black bg-primary/10 px-2 py-1 rounded text-sm">
                          {record.finalScore !== undefined ? record.finalScore : record.baseScore}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-6">
                        <Building size={16} className="text-gray-400" />
                        <span className="truncate">{record.company || 'Unknown Company'}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                        <span className="font-medium">{formatDate(record.createdAt)}</span>
                        <span className="flex items-center gap-1 font-semibold group-hover:text-primary transition-colors">
                          View details <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default Assessments;

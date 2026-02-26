import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Target, CheckCircle2, ListChecks, CalendarDays, KeyRound, Building2, UserCircle, MessageSquareQuote, Download, Copy, Info } from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  const [result, setResult] = useState(null);

  // Synchronize result state with actual URL changes dynamically
  useEffect(() => {
    const saved = localStorage.getItem('jdHistory');
    if (!saved) return;

    const history = JSON.parse(saved);
    if (!history || history.length === 0) return;

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (id) {
      const match = history.find(item => item.id === id);
      if (match) {
        setResult(match);
        return;
      }
    }
    setResult(history[0]);
  }, [location.search]);

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Target size={64} className="text-gray-200 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Analysis Available</h2>
        <p className="text-gray-500 mb-6 max-w-sm">You haven't analyzed any job descriptions yet. Head over to the Assessments tab to get started.</p>
        <button
          onClick={() => navigate('/assessments')}
          className="bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
        >
          Start Analysis
        </button>
      </div>
    );
  }

  const { company, role, extractedSkills, plan, checklist, questions, readinessScore, skillConfidenceMap = {}, baseScore } = result;

  const handleToggleSkill = (skill) => {
    const newMap = { ...skillConfidenceMap };
    newMap[skill] = newMap[skill] === 'know' ? 'practice' : 'know';

    let modifier = 0;
    for (const val of Object.values(newMap)) {
      if (val === 'know') modifier += 2;
      // When practice, modifier is 0. This ensures the change is strictly +2 or -2 per toggle.
    }

    // Fallback to readinessScore for legacy records
    const startingScore = typeof baseScore === 'number' ? baseScore : readinessScore;
    const newScore = Math.max(0, Math.min(100, startingScore + modifier));

    const newResult = {
      ...result,
      skillConfidenceMap: newMap,
      readinessScore: newScore,
      baseScore: startingScore
    };

    setResult(newResult);

    const saved = localStorage.getItem('jdHistory');
    if (saved) {
      const history = JSON.parse(saved);
      const updatedHistory = history.map(item => item.id === newResult.id ? newResult : item);
      localStorage.setItem('jdHistory', JSON.stringify(updatedHistory));
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyPlan = () => handleCopy('plan', plan.map(item => `${item.day} - ${item.task}\n${item.detail}`).join('\n\n'));
  const copyChecklist = () => handleCopy('checklist', checklist.map(round => `${round.title}\n` + round.items.map(i => `- ${i}`).join('\n')).join('\n\n'));
  const copyQuestions = () => handleCopy('questions', questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n'));

  const downloadTxt = () => {
    let content = `Placement Readiness Analysis\nCompany: ${company}\nRole: ${role}\nScore: ${readinessScore}/100\n\n`;
    content += `--- 7-DAY PLAN ---\n${plan.map(item => `${item.day} - ${item.task}\n${item.detail}`).join('\n\n')}\n\n`;
    content += `--- ROUND CHECKLIST ---\n${checklist.map(round => `${round.title}\n` + round.items.map(i => `- ${i}`).join('\n')).join('\n\n')}\n\n`;
    content += `--- INTERVIEW QUESTIONS ---\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n')}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${company.replace(/\s+/g, '_')}_Analysis.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const weakSkills = Object.entries(skillConfidenceMap).filter(([_, val]) => val === 'practice').map(([skill]) => skill).slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Analysis Results</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-gray-700">
              <Building2 size={16} /> {company}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-gray-700">
              <UserCircle size={16} /> {role}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={downloadTxt} className="px-3 py-1.5 flex items-center gap-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <Download size={15} /> Download Full TXT
            </button>
            <button onClick={copyPlan} className="px-3 py-1.5 flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors w-32 justify-center">
              {copiedId === 'plan' ? <><CheckCircle2 size={15} className="text-green-500" /> <span className="text-green-600">Copied!</span></> : <><Copy size={15} /> 7-Day Plan</>}
            </button>
            <button onClick={copyChecklist} className="px-3 py-1.5 flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors w-32 justify-center">
              {copiedId === 'checklist' ? <><CheckCircle2 size={15} className="text-green-500" /> <span className="text-green-600">Copied!</span></> : <><Copy size={15} /> Checklist</>}
            </button>
            <button onClick={copyQuestions} className="px-3 py-1.5 flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors w-32 justify-center">
              {copiedId === 'questions' ? <><CheckCircle2 size={15} className="text-green-500" /> <span className="text-green-600">Copied!</span></> : <><Copy size={15} /> Questions</>}
            </button>
          </div>
        </div>

        {/* Big Score Card */}
        <div className="bg-white border rounded-xl shadow-sm px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Estimated Score</span>
            <span className="text-xs text-gray-400 mt-0.5">Profile Match</span>
          </div>
          <div className="text-4xl font-bold text-primary tabular-nums">
            {readinessScore}<span className="text-xl text-gray-400 font-medium">/100</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">

        {/* Extracted Skills */}
        <Card>
          <CardHeader className="pb-3 border-b border-gray-50 bg-gray-50/30">
            <CardTitle className="flex items-center gap-2">
              <Target className="text-primary" size={20} />
              Key Skills Detected
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(extractedSkills).map(([category, skills]) => (
                <div key={category} className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{category}</h4>
                  <div className="flex flex-wrap gap-3">
                    {skills.map(skill => {
                      const mode = skillConfidenceMap[skill] || 'practice';
                      const isKnow = mode === 'know';
                      return (
                        <button
                          key={skill}
                          onClick={() => handleToggleSkill(skill)}
                          className={`group relative flex items-center justify-between gap-3 px-3.5 py-2 border rounded-xl text-sm font-semibold transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${isKnow
                              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300 focus:ring-green-400'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:ring-indigo-400 shadow-sm'
                            }`}
                        >
                          {skill}
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md transition-colors ${isKnow
                              ? 'bg-green-200/50 text-green-700 group-hover:bg-green-200'
                              : 'bg-orange-100/80 text-orange-700 group-hover:bg-orange-200 group-hover:text-orange-800'
                            }`}>
                            {isKnow ? 'I know' : 'Need practice'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 7-Day Plan */}
        <Card>
          <CardHeader className="pb-3 border-b border-gray-50 bg-gray-50/30">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="text-primary" size={20} />
              Strategic 7-Day Prep Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {plan.map((item, index) => (
                <div key={index} className="bg-white border flex flex-col p-4 rounded-xl shadow-sm border-gray-100 hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-sm bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
                      {index + 1}
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm whitespace-nowrap">
                      {item.day}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/5 self-start px-2 py-1 rounded tracking-wide mb-2 uppercase">
                    {item.task}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed mt-auto">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Round-wise Checklist */}
        <Card className="shadow-md border-primary/10">
          <CardHeader className="pb-3 border-b border-gray-50 bg-gray-50/30">
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="text-primary" size={20} />
              Round-wise Checklist
            </CardTitle>
            <CardDescription>Preparation required per round</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 divide-y divide-gray-100">
            {checklist.map((round, idx) => (
              <div key={idx} className="py-4 first:pt-2 last:pb-2">
                <h4 className="font-semibold text-gray-900 mb-3">{round.title}</h4>
                <ul className="space-y-2.5">
                  {round.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Likely Questions */}
        <Card>
          <CardHeader className="pb-3 border-b border-gray-50 bg-gray-50/30">
            <CardTitle className="flex items-center gap-2">
              <MessageSquareQuote className="text-primary" size={20} />
              Likely Interview Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {questions.map((q, idx) => (
              <div key={idx} className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="font-bold text-primary/40 shrink-0">Q{idx + 1}.</span>
                <p className="text-sm font-medium text-gray-800">{q}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Next Box */}
        {weakSkills.length > 0 && (
          <Card className="bg-primary/5 border-primary/20 shadow-none">
            <CardContent className="pt-6 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                <Info size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Recommended Next Action</h3>
                <p className="text-gray-600 leading-relaxed">
                  Focus heavily on <span className="font-bold text-gray-900">{weakSkills.join(', ')}</span>.
                  Start the <span className="font-semibold text-primary">Day 1</span> plan now to build aggressive confidence before your interview.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

      </div>

    </div>
  );
};

export default Results;

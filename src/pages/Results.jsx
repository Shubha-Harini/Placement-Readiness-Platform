import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Target, CheckCircle2, ListChecks, CalendarDays, KeyRound, Building2, UserCircle, MessageSquareQuote } from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState(() => {
    const saved = localStorage.getItem('jdHistory');
    if (!saved) return null;

    const history = JSON.parse(saved);
    if (!history || history.length === 0) return null;

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (id) {
      const match = history.find(item => item.id === id);
      return match || history[0];
    }
    return history[0];
  });

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

  const { company, role, extractedSkills, plan, checklist, questions, readinessScore } = result;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Analysis Results</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-gray-700">
              <Building2 size={16} /> {company}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-gray-700">
              <UserCircle size={16} /> {role}
            </span>
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
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-md text-sm font-medium">
                        {skill}
                      </span>
                    ))}
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

      </div>

    </div>
  );
};

export default Results;

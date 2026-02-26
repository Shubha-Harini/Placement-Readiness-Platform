import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { CalendarClock, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';

const mockRadarData = [
  { subject: 'DSA', A: 75, fullMark: 100 },
  { subject: 'System Design', A: 60, fullMark: 100 },
  { subject: 'Communication', A: 80, fullMark: 100 },
  { subject: 'Resume', A: 85, fullMark: 100 },
  { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const mockAssessments = [
  { id: 1, title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
  { id: 2, title: 'System Design Review', time: 'Wed, 2:00 PM' },
  { id: 3, title: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const activeDays = [true, true, false, true, false, false, false]; // Mon, Tue, Thu

const Dashboard = () => {
  // Test Variables Configuration
  const inputScore = 72; // Manually change this to 120 or -10 to test clamping!
  const practiceCompleted = 3; // Manually change this to 10 to test the empty state

  // Logic
  const clampedScore = Math.min(100, Math.max(0, inputScore));
  const practiceTotal = 10;
  const practiceProgressPercent = (practiceCompleted / practiceTotal) * 100;
  const isPracticeComplete = practiceCompleted >= practiceTotal;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (clampedScore / 100) * circumference;

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // Small delay to trigger the stroke dasharray animation after mount
    const timeout = setTimeout(() => {
      setOffset(targetOffset);
    }, 100);
    return () => clearTimeout(timeout);
  }, [targetOffset, circumference]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Overall Readiness (SVG Circle) */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-4 pb-8">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                {/* Background Circle */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-gray-100"
                />
                {/* Progress Circle */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="text-primary transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Center Text */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">{clampedScore}<span className="text-xl text-gray-500 font-normal">/100</span></span>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-500 uppercase tracking-widest">
              Readiness Score
            </p>
          </CardContent>
        </Card>

        {/* Skill Breakdown (Recharts Radar) */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[280px] w-full pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockRadarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="hsl(245, 58%, 51%)"
                  fill="hsl(245, 58%, 51%)"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Continue Practice */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Continue Practice</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <BookOpen size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">Dynamic Programming</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {isPracticeComplete ? "All topics complete!" : `${practiceCompleted}/${practiceTotal} problems completed`}
                </p>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-8">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, practiceProgressPercent)}%` }}
              ></div>
            </div>

            <button className="w-full bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:text-primary font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              Continue
              <ChevronRight size={18} />
            </button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Weekly Goals */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Weekly Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-gray-700">Problems Solved</span>
                <span className="text-sm text-gray-500"><strong className="text-gray-900">12</strong>/20 this week</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                <div className="bg-green-500 h-2 rounded-full w-[60%]"></div>
              </div>

              <div className="flex justify-between items-center px-2">
                {daysOfWeek.map((day, index) => (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${activeDays[index] ? 'bg-primary text-white' : 'bg-gray-100 text-transparent'
                        }`}
                    >
                      {activeDays[index] && <CheckCircle2 size={14} />}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Assessments */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className="mt-0.5 text-primary">
                      <CalendarClock size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">{assessment.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{assessment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

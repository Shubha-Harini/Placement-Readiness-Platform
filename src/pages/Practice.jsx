import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Code2, Play } from 'lucide-react';

const Practice = () => {
  const problems = [
    { title: "Two Sum", difficulty: "Easy", category: "Arrays & Hashing", time: "15 mins" },
    { title: "Reverse Linked List", difficulty: "Easy", category: "Linked List", time: "20 mins" },
    { title: "Valid Parentheses", difficulty: "Easy", category: "Stack", time: "20 mins" },
    { title: "LRU Cache", difficulty: "Medium", category: "System Design", time: "45 mins" },
    { title: "Merge K Sorted Lists", difficulty: "Hard", category: "Heap / Priority Queue", time: "60 mins" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Practice Arena</h1>
        <p className="text-gray-500">Sharpen your skills with curated coding problems mapped to company standards.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((prob, idx) => (
          <Card key={idx} className="hover:border-primary/30 transition-all hover:shadow-md group">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Code2 size={20} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${prob.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    prob.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                  }`}>
                  {prob.difficulty}
                </span>
              </div>
              <CardTitle className="text-lg">{prob.title}</CardTitle>
              <CardDescription className="text-gray-500 font-medium">{prob.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>⏱ {prob.time}</span>
                <button className="flex items-center gap-1 text-primary font-semibold hover:text-primary/80 transition-colors">
                  Solve <Play size={14} fill="currentColor" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Practice;

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { BookOpen, Video, ExternalLink, Download } from 'lucide-react';

const Resources = () => {
  const resources = [
    { title: "System Design Primer", type: "Guide", icon: <BookOpen />, time: "120 mins" },
    { title: "Behavioral STAR Method", type: "Video", icon: <Video />, time: "15 mins" },
    { title: "Resume Polish Checklist", type: "PDF", icon: <Download />, time: "5 mins" },
    { title: "Blind 75 LeetCode Sheet", type: "Link", icon: <ExternalLink />, time: "Ongoing" },
    { title: "Mock Interview Guide", type: "Guide", icon: <BookOpen />, time: "30 mins" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Study Resources</h1>
        <p className="text-gray-500">Curated materials to accelerate your prep.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, idx) => (
          <Card key={idx} className="hover:border-primary/30 transition-all hover:shadow-md group">
            <CardHeader className="pb-3 flex-row items-center gap-3 space-y-0">
              <div className="p-2.5 bg-primary/10 rounded-lg text-primary shrink-0">
                {res.icon}
              </div>
              <div>
                <CardTitle className="text-lg leading-tight">{res.title}</CardTitle>
                <CardDescription className="text-gray-500 font-medium">{res.type}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                <span>⏱ {res.time}</span>
                <button className="flex items-center gap-1 text-primary font-semibold hover:text-primary/80 transition-colors">
                  Open
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Resources;

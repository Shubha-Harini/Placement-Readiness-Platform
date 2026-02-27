import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { User, Mail, Shield, Settings, Bell, ChevronRight } from 'lucide-react';

const Profile = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-500">Manage account information and platform preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 space-y-6">
          <Card className="border-gray-100 shadow-sm relative overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/80 to-indigo-600 rounded-t-xl absolute top-0 inset-x-0"></div>
            <CardContent className="pt-12 relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-white p-1 rounded-full shadow-md mb-4 border-2 border-white">
                <div className="w-full h-full bg-primary/10 rounded-full flex justify-center items-center text-primary">
                  <User size={40} />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Student Developer</h2>
              <p className="text-gray-500 text-sm font-medium">BCA - Artificial Intelligence</p>
              <div className="w-full px-4 mt-6 pt-6 border-t border-gray-100 flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Readiness Level</span>
                <span className="text-primary font-bold">Advanced</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3 space-y-4">
          <Card className="hover:border-primary/20 transition-all cursor-pointer group">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-2.5 rounded-lg text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">Email Addresses</h3>
                  <p className="text-sm text-gray-500 pt-0.5">student@gmail.com</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-primary/50" />
            </CardContent>
          </Card>

          <Card className="hover:border-primary/20 transition-all cursor-pointer group">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-2.5 rounded-lg text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">Password & Security</h3>
                  <p className="text-sm text-gray-500 pt-0.5">Manage 2FA and login devices</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-primary/50" />
            </CardContent>
          </Card>

          <Card className="hover:border-primary/20 transition-all cursor-pointer group">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-2.5 rounded-lg text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Bell size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight">Notifications</h3>
                  <p className="text-sm text-gray-500 pt-0.5">Weekly stats and plan reminders</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-primary/50" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

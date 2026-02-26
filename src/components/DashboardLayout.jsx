import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Code2, ClipboardList, BookOpen, User, Menu, X } from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Practice', path: '/practice', icon: <Code2 size={20} /> },
    { label: 'Assessments', path: '/assessments', icon: <ClipboardList size={20} /> },
    { label: 'Resources', path: '/resources', icon: <BookOpen size={20} /> },
    { label: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden relative">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Placement Prep</h2>
          <button
            className="md:hidden text-gray-500 hover:text-gray-800 p-1"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-primary transition-colors focus:outline-none p-1 rounded-md active:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <div className="font-bold text-primary text-xl truncate">
              Placement Prep
            </div>
          </div>

          <div className="flex-1 hidden md:block">
            {/* Can add search here later */}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-sm text-sm sm:text-base cursor-pointer hover:bg-opacity-90 transition-colors">
              <User size={18} className="sm:w-5 sm:h-5" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;

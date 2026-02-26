import { Link } from 'react-router-dom';
import { Code, Video, BarChart } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ace Your Placement
          </h1>
          <p className="text-lg md:text-xl mb-10 text-primary-50 opacity-90">
            Practice, assess, and prepare for your dream job
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-white text-primary font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-6">
              <Code size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Practice Problems</h3>
            <p className="text-gray-600">
              Sharpen your coding skills with hundreds of curated problems from top companies.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-6">
              <Video size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Mock Interviews</h3>
            <p className="text-gray-600">
              Experience real interview scenarios with industry experts to build your confidence.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-6">
              <BarChart size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your growth with detailed analytics and personalized learning paths.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;

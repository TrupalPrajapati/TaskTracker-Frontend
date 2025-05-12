import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">

        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">TaskTracker</span>
        </h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          A simple way to organize your tasks and <br />
          <span className="font-medium text-gray-700">get more done every day.</span>
        </p>

        <div className="space-y-4">
          <Link
            to="/signup"
            className="inline-block w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-all shadow-md"
          >
            Try it now — free
          </Link>
          <p className="text-gray-500 text-sm">
            Already using TaskTracker?{' '}
            <Link to="/login" className="text-blue-700 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="my-10 border-t border-gray-200 relative">
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 px-4 text-gray-500">
            Quick and easy
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          {[
            { icon: '📅', text: 'Track deadlines', bg: 'bg-blue-50', textColor: 'text-blue-700' },
            { icon: '✅', text: 'Check off tasks', bg: 'bg-blue-100', textColor: 'text-blue-800' },
            { icon: '📱', text: 'Any device', bg: 'bg-blue-50', textColor: 'text-blue-700' },
          ].map((item) => (
            <div key={item.text} className={`${item.bg} ${item.textColor} p-3 rounded-lg border border-blue-100`}>
              <span className="block text-xl mb-1">{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
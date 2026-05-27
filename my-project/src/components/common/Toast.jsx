// components/common/Toast.jsx
import { useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X
} from 'lucide-react';

const Toast = ({
  type = 'info',
  message,
  onClose,
  duration = 4000
}) => {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      container: 'bg-green-50/90 border-green-200',
      progress: 'bg-green-500'
    },
    error: {
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      container: 'bg-red-50/90 border-red-200',
      progress: 'bg-red-500'
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
      container: 'bg-yellow-50/90 border-yellow-200',
      progress: 'bg-yellow-500'
    },
    info: {
      icon: <Info className="w-5 h-5 text-blue-600" />,
      container: 'bg-blue-50/90 border-blue-200',
      progress: 'bg-blue-500'
    }
  };

  const { icon, container, progress } = config[type];

  return (
    <div className="fixed top-5 right-5 z-50 animate-toast-in">
      <div
        className={`relative w-85 backdrop-blur-md border rounded-xl shadow-xl ${container}`}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="p-4 flex gap-3">
          <div className="mt-0.5">{icon}</div>
          <p className="text-sm font-medium text-gray-800 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Progress bar */}
        {duration && (
          <div className="h-1 w-full overflow-hidden rounded-b-xl bg-gray-200">
            <div
              className={`h-full ${progress} animate-toast-progress`}
              style={{ animationDuration: `${duration}ms` }}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Toast;

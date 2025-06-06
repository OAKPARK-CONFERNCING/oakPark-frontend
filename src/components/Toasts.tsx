import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeToast } from '@/redux/toastSlice';

export default function Toasts() {
  const toasts = useSelector((state: RootState) => state.toast.toasts);
  const dispatch = useDispatch();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.filter(t => t.open).map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow text-white ${
            toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' :
            toast.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
          }`}
        >
          {toast.message}
          <button
            className="ml-4 text-white"
            onClick={() => dispatch(removeToast(toast.id))}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
} 
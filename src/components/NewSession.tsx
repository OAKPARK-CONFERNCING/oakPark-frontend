import { useState } from 'react';
import { motion } from 'framer-motion';
import { createRoom, CreateRoomResponse } from '../api/apiconfig';
import { useDispatch } from 'react-redux';
import { addToast } from '../redux/toastSlice';
import { useNavigate } from 'react-router';
import { Copy, Check } from 'lucide-react';

interface NewSessionProps {
  onClose: () => void;
}

const NewSession = ({ onClose }: NewSessionProps) => {
  const [privacy, setPrivacy] = useState('Private');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [duration, setDuration] = useState('');
  const [roomImage, setRoomImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roomCreated, setRoomCreated] = useState<CreateRoomResponse | null>(null);
  const [copied, setCopied] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !tag || !duration) {
      dispatch(addToast({
        id: Date.now().toString(),
        message: 'Please fill in all required fields',
        type: 'error',
        open: true
      }));
      return;
    }

    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      dispatch(addToast({
        id: Date.now().toString(),
        message: 'Please enter a valid duration in minutes',
        type: 'error',
        open: true
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      const roomData = {
        startTime: "2024-01-15T10:00:00Z",
        title,
        description,
        tag,
        durationInSeconds: durationNum * 60, // Convert minutes to seconds
        isPrivateRoom: privacy === 'Private',
        ...(roomImage && { roomImage })
      };

      console.log("Creating room with data:", roomData);
      const response = await createRoom(roomData);

      if (response.success && response.data) {
        setRoomCreated(response.data);
        dispatch(addToast({
          id: Date.now().toString(),
          message: 'Room created successfully!',
          type: 'success',
          open: true
        }));
      } else {
        dispatch(addToast({
          id: Date.now().toString(),
          message: response.message || 'Failed to create room',
          type: 'error',
          open: true
        }));
      }
    } catch (error) {
      dispatch(addToast({
        id: Date.now().toString(),
        message: 'An error occurred while creating the room',
        type: 'error',
        open: true
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (roomCreated?.code) {
      navigator.clipboard.writeText(roomCreated.code);
      setCopied(true);
      dispatch(addToast({
        id: Date.now().toString(),
        message: 'Room code copied to clipboard!',
        type: 'success',
        open: true
      }));
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleJoinNow = () => {
    if (roomCreated?.code) {
      // Store room code in localStorage
      localStorage.setItem('roomCode', roomCreated.code);
      localStorage.setItem('roomId', roomCreated._id);
      // Navigate to video conference
      navigate('/video');
      onClose();
    }
  };

  const handleCloseSuccess = () => {
    setRoomCreated(null);
    onClose();
  };

  // Success Modal
  if (roomCreated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-bg-secondary/36"
          onClick={handleCloseSuccess}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.25 },
          }}
          className="relative z-10 bg-white rounded-2xl shadow-md p-8 w-[500px] max-w-full border border-gray-100"
        >
          <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h2 className="text-2xl font-semibold mb-2">Room Created Successfully!</h2>
            <p className="text-gray-600 mb-6">Your meeting room "{roomCreated.title}" is ready</p>

            {/* Room Code Display */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 w-full">
              <p className="text-sm text-gray-600 mb-2">Room Code</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-medium-green tracking-wider">{roomCreated.code}</span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Copy code"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full">
              <button
                onClick={handleCopyCode}
                className="flex-1 px-6 py-3 border-2 border-medium-green text-medium-green rounded-full font-semibold hover:bg-green-50 transition-colors"
              >
                Copy Room Code
              </button>
              <button
                onClick={handleJoinNow}
                className="flex-1 px-6 py-3 bg-medium-green text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
              >
                Join Now
              </button>
            </div>

            <button
              onClick={handleCloseSuccess}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Create Room Form Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-bg-secondary/36"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.2,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.25 },
        }}
        className="relative z-10 overflow-y-auto bg-white rounded-2xl shadow-md p-8 w-[600px] max-w-full max-h-[90vh] border border-gray-100"
      >
        <h1 className="text-center text-2xl font-semibold mb-8">Create a new Session</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Title <span className="text-xs text-gray-400">required</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Weekly Team Meeting"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-medium-green"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Description <span className="text-xs text-gray-400">required</span>
            </label>
            <textarea
              placeholder="Describe what this session is about..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-medium-green"
            />
          </div>

          {/* Tag */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Tag <span className="text-xs text-gray-400">required</span>
            </label>
            <input
              type="text"
              placeholder="e.g., team, project, standup"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-medium-green"
            />
            <p className="text-xs text-gray-400 mt-1">Add a tag to categorize your session</p>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Duration (in minutes) <span className="text-xs text-gray-400">required</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              min="1"
              className="w-32 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-medium-green"
            />
            <p className="text-xs text-gray-400 mt-1">Enter duration in minutes</p>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Add Image URL <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={roomImage}
              onChange={(e) => setRoomImage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-medium-green"
            />
          </div>

          {/* Privacy */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Would you like your session to be private or public?{' '}
              <span className="text-xs text-gray-400">required</span>
            </label>
            <div className="flex gap-8 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="Private"
                  checked={privacy === 'Private'}
                  onChange={() => setPrivacy('Private')}
                  className="accent-[#4CAF50]"
                />
                <span>Private</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="Public"
                  checked={privacy === 'Public'}
                  onChange={() => setPrivacy('Public')}
                  className="accent-[#4CAF50]"
                />
                <span>Public</span>
              </label>
            </div>
          </div>

          {/* Create Session button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#4CAF50] text-white px-8 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Create Session
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default NewSession;

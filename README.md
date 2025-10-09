# Mediasoup Video Conferencing Client

A minimal React frontend for mediasoup video conferencing that integrates with a mediasoup signaling server to enable real-time video/audio sharing between participants.

## Features

- **Real-time Video/Audio**: Share camera and microphone with multiple participants
- **Room-based Conferencing**: Join rooms using room IDs
- **Media Controls**: Toggle camera and microphone on/off
- **Responsive Grid Layout**: Automatic layout adjustment for multiple participants
- **Error Handling**: User-friendly error messages and connection management
- **Modern UI**: Clean, responsive interface with dark theme

## Technology Stack

- **React 18+** with TypeScript
- **Socket.IO Client** for real-time signaling
- **mediasoup-client** for WebRTC handling
- **Vite** for development and building
- **CSS3** with responsive design

## Prerequisites

1. **Mediasoup Signaling Server**: You need a running mediasoup server that implements the socket events described below
2. **Modern Browser**: Supports WebRTC (Chrome, Firefox, Safari, Edge)
3. **HTTPS or localhost**: WebRTC requires secure context

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. **Start the Application**: Access the app at `http://localhost:5173`
2. **Enter Room Details**:
   - Room ID: Alphanumeric identifier for the conference room
   - Your Name: Display name for other participants
3. **Join Room**: Click "Join Room" to enter the conference
4. **Media Controls**: Use buttons to toggle camera/microphone or leave the room

## File Structure

```
src/
├── components/
│   ├── VideoCall.tsx          # Main conference component
│   ├── ParticipantVideo.tsx   # Individual participant display
│   └── MediaControls.tsx      # Camera/mic controls
├── hooks/
│   ├── useSocket.ts           # Socket connection management
│   ├── useMediasoup.ts        # Mediasoup client logic
│   └── useUserMedia.ts        # Media device handling
├── types/
│   └── socket.types.ts        # Socket event type definitions
├── utils/
│   └── mediasoupHelpers.ts    # Helper functions
└── index.css                  # Styling
```

## Socket Events

### Client to Server Events

| Event | Data | Description |
|-------|------|-------------|
| `join-room` | `{roomId, userId, peerName}` | Join a conference room |
| `leave-room` | - | Leave the current room |
| `get-router-rtp-capabilities` | `{roomId}` | Get RTP capabilities |
| `create-webrtc-transport` | `{producing}` | Create send/receive transport |
| `connect-webrtc-transport` | `{transportId, dtlsParameters}` | Connect transport |
| `produce` | `{transportId, kind, rtpParameters}` | Start media production |
| `consume` | `{transportId, producerId, rtpCapabilities}` | Consume remote media |
| `resume-consumer` | `{consumerId}` | Resume media consumer |

### Server to Client Events

| Event | Description |
|-------|-------------|
| `join-room-success` | Room joined successfully with peer list |
| `join-room-error` | Room join failed |
| `webrtc-transport-created` | Transport created with connection params |
| `produced` | Media producer created successfully |
| `consumed` | Media consumer created successfully |
| `new-producer` | New remote producer available |
| `peer-left` | Participant left the room |
| `new-peer` | New participant joined |

## Configuration

### Server URL

Update the socket connection URL in `useSocket.ts`:

```typescript
const { socket } = useSocket('http://your-mediasoup-server:3000');
```

### Media Quality

Adjust video/audio constraints in `useUserMedia.ts` or use the helper functions in `mediasoupHelpers.ts`:

```typescript
const constraints = getVideoConstraints('high'); // 'low', 'medium', 'high'
```

## Browser Support

- **Chrome/Chromium** 74+
- **Firefox** 66+
- **Safari** 12.1+
- **Edge** 79+

## Security Considerations

- **HTTPS Required**: WebRTC requires secure context in production
- **Media Permissions**: Users must grant camera/microphone access
- **Room Access**: Consider implementing room authentication in your server

## Troubleshooting

### Common Issues

1. **"Camera/microphone access denied"**
   - Grant permissions in browser
   - Check browser settings for media access

2. **"Failed to join room"**
   - Verify server is running
   - Check network connectivity
   - Ensure room ID is valid

3. **No video/audio from remote participants**
   - Check ICE candidates and STUN/TURN configuration
   - Verify firewall settings
   - Test with local network first

### Development

```bash
# Check for TypeScript errors
npm run build

# Run linting
npm run lint
```

## Performance Optimization

- **Grid Layout**: Automatically adjusts based on participant count
- **Video Quality**: Adaptive based on device capabilities
- **Resource Cleanup**: Proper cleanup on component unmount
- **Error Recovery**: Automatic reconnection on connection loss

## Contributing

1. Follow TypeScript strict mode
2. Use provided ESLint configuration
3. Test with multiple participants
4. Ensure responsive design works on mobile

## License

This project is part of a mediasoup video conferencing implementation.

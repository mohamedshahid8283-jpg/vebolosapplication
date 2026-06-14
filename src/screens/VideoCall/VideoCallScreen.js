import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Global Redux Architecture Actions & Custom Selective Slices
import { useSelector, useDispatch } from 'react-redux';
import {
  setCallStatus,
  setRemoteUser,
  setCallDuration,
  toggleMic,
  toggleCamera,
  resetCall,
} from '../../redux/slices/videoCallSlice';

// Structural Context Hooks, Services, and Utilities
import useSocket from '../../hooks/useSocket';
import useTheme from '../../hooks/useTheme';
import { CALL_STATUS } from '../../utils/constants';
import { formatCallDuration } from '../../utils/dateFormatter';
import { requestVideoCallPermissions } from '../../utils/permissons';

// Visual Sub-Screen Components Mapping Layout Structures
import MatchingScreen from '../VideoCall/MatchingScreen';
import CallEndedScreen from '../VideoCall/CallEndedScreen';
import CallControls from '../../components/videocall/CallControls';
import VideoPreview from '../../components/videocall/VideoPreview';
import AddFriendButton from '../../components/videocall/AddFriendButton';

// Dynamic Database Mock Entities List Array
const fallbackOnlineUsers = [
  {
    id: 'mock_user_sophia_44',
    name: 'Sophia',
    country: 'Germany',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 'mock_user_emma_28',
    name: 'Emma',
    country: 'USA',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    id: 'mock_user_lucas_55',
    name: 'Lucas',
    country: 'Canada',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
];

export default function VideoCallScreen({ navigation }) {
  const dispatch = useDispatch();
  const socketService = useSocket();
  const { colors } = useTheme();

  // Retrieve states asynchronously directly from Redux global memory slices
  const { status, remoteUser, duration, micEnabled, cameraEnabled } =
    useSelector(state => state.videoCall);
  const { user: currentUser } = useSelector(state => state.auth);

  const [showAddFriend, setShowAddFriend] = useState(false);

  // Monitors call runtime tracking timelines dynamically while connected
  useEffect(() => {
    let callTimer;

    if (status === CALL_STATUS.CONNECTED) {
      callTimer = setInterval(() => {
        const nextDurationValue = duration + 1;
        dispatch(setCallDuration(nextDurationValue));

        // Show add friend option automatically if duration matches parameter guidelines (e.g. 60 seconds)
        if (nextDurationValue >= 60) {
          setShowAddFriend(true);
        }
      }, 1000);
    }

    return () => clearInterval(callTimer);
  }, [status, duration, dispatch]);

  // Clean-up hooks layer that resets call configurations when leaving the screen
  useEffect(() => {
    return () => {
      dispatch(resetCall());
    };
  }, [dispatch]);

  const startMatching = async () => {
    // 1. Force safety prompt checks validation against system camera/mic hardware capabilities
    const hasHardwareAccessPermissions = await requestVideoCallPermissions();
    if (!hasHardwareAccessPermissions) {
      Alert.alert(
        'Permissions Required',
        'Camera and Audio hardware authorization lines are required.',
      );
      return;
    }

    // 2. Set current slice profile state parameters to match searching statuses
    dispatch(setCallStatus(CALL_STATUS.SEARCHING));
    setShowAddFriend(false);

    // 3. Emulate network server stream synchronization metrics
    setTimeout(() => {
      const selectedMatchedProfile =
        fallbackOnlineUsers[
          Math.floor(Math.random() * fallbackOnlineUsers.length)
        ];

      dispatch(setRemoteUser(selectedMatchedProfile));
      dispatch(setCallStatus(CALL_STATUS.CONNECTED));

      // Broadcast active signaling payloads down out across backend socket lines
      socketService.startVideoCall({
        roomId: `room_${Date.now()}`,
        senderId: currentUser?.id || 'me',
        receiverId: selectedMatchedProfile.id,
      });
    }, 3000);
  };

  const endCall = () => {
    // Notify corresponding user client peers via real-time stream lines
    if (remoteUser?.id) {
      socketService.endVideoCall({ receiverId: remoteUser.id });
    }
    dispatch(setCallStatus(CALL_STATUS.ENDED));
  };

  const handleReturnToHome = () => {
    dispatch(resetCall());
    navigation.navigate('Home');
  };

  // Evaluate structural router switches using fixed constants schemas
  if (status === CALL_STATUS.SEARCHING) {
    return (
      <SafeAreaView style={styles.container}>
        <MatchingScreen />
      </SafeAreaView>
    );
  }

  if (status === CALL_STATUS.ENDED) {
    return (
      <SafeAreaView style={styles.container}>
        <CallEndedScreen
          duration={formatCallDuration(duration)}
          onRestart={startMatching}
          onHome={handleReturnToHome}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {status === CALL_STATUS.IDLE ? (
        <View style={styles.startContainer}>
          <Ionicons name="videocam" size={100} color={colors.primary} />

          <Text style={styles.title}>Random Video Chat</Text>
          <Text style={styles.subtitle}>Meet new people around the world</Text>

          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: colors.primary }]}
            onPress={startMatching}
          >
            <Text style={styles.buttonText}>Start Video Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleReturnToHome}
          >
            <Text style={styles.buttonText}>Back To Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Active Call Video Screen Interface Elements Overlay Layout */}
          <Image
            source={{
              uri: remoteUser?.image || 'https://via.placeholder.com/600',
            }}
            style={styles.remoteVideo}
          />

          <View style={styles.overlay} />

          {/* Displays your local video feed component overlay frames */}
          <VideoPreview cameraEnabled={cameraEnabled} />

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{remoteUser?.name || 'User'}</Text>
            <Text style={styles.country}>
              {remoteUser?.country || 'Global'}
            </Text>
            <Text style={styles.timer}>{formatCallDuration(duration)}</Text>
          </View>

          {showAddFriend && (
            <AddFriendButton
              onPress={() => Alert.alert('Success', 'Friend Request Sent')}
            />
          )}

          <CallControls
            micEnabled={micEnabled}
            cameraEnabled={cameraEnabled}
            onToggleMic={() => dispatch(toggleMic())}
            onToggleCamera={() => dispatch(toggleCamera())}
            onEndCall={endCall}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 20,
  },
  subtitle: {
    color: '#AAAAAA',
    marginTop: 10,
    marginBottom: 30,
  },
  startButton: {
    width: 260,
    height: 55,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  homeButton: {
    width: 260,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  userInfo: {
    position: 'absolute',
    left: 20,
    bottom: 180,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  country: {
    color: '#DDDDDD',
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  timer: {
    color: '#00E676',
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
  },
});

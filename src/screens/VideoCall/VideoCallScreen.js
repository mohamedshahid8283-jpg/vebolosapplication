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

import MatchingScreen from './MatchingScreen';
import CallEndedScreen from './CallEndedScreen';

import CallControls from '../../components/videocall/CallControls';
import VideoPreview from '../../components/videocall/VideoPreview';
import AddFriendButton from '../../components/videocall/AddFriendButton';

const users = [
  {
    id: 1,
    name: 'Sophia',
    country: 'Germany',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Emma',
    country: 'USA',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    id: 3,
    name: 'Lucas',
    country: 'Canada',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
];

export default function VideoCallScreen({ navigation }) {
  const [status, setStatus] = useState('idle');

  const [matchedUser, setMatchedUser] = useState(null);

  const [callTime, setCallTime] = useState(0);

  const [showAddFriend, setShowAddFriend] = useState(false);

  const [micEnabled, setMicEnabled] = useState(true);

  const [cameraEnabled, setCameraEnabled] = useState(true);

  useEffect(() => {
    let timer;

    if (status === 'connected') {
      timer = setInterval(() => {
        setCallTime(prev => {
          const next = prev + 1;

          if (next >= 60) {
            setShowAddFriend(true);
          }

          return next;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [status]);

  const startMatching = () => {
    setStatus('matching');

    setTimeout(() => {
      const random = users[Math.floor(Math.random() * users.length)];

      setMatchedUser(random);

      setStatus('connected');

      setCallTime(0);

      setShowAddFriend(false);
    }, 3000);
  };

  const endCall = () => {
    setStatus('ended');
  };

  const formatTime = sec => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;

    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (status === 'matching') {
    return (
      <SafeAreaView style={styles.container}>
        <MatchingScreen />
      </SafeAreaView>
    );
  }

  if (status === 'ended') {
    return (
      <SafeAreaView style={styles.container}>
        <CallEndedScreen
          duration={formatTime(callTime)}
          onRestart={startMatching}
          onHome={() => navigation.navigate('Home')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {status === 'idle' ? (
        <View style={styles.startContainer}>
          <Ionicons name="videocam" size={100} color="#7C4DFF" />

          <Text style={styles.title}>Random Video Chat</Text>

          <Text style={styles.subtitle}>Meet new people around the world</Text>

          <TouchableOpacity style={styles.startButton} onPress={startMatching}>
            <Text style={styles.buttonText}>Start Video Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Back To Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Image
            source={{
              uri: matchedUser.image,
            }}
            style={styles.remoteVideo}
          />

          <View style={styles.overlay} />

          <VideoPreview />

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{matchedUser.name}</Text>

            <Text style={styles.country}>{matchedUser.country}</Text>

            <Text style={styles.timer}>{formatTime(callTime)}</Text>
          </View>

          {showAddFriend && (
            <AddFriendButton
              onPress={() => Alert.alert('Success', 'Friend Request Sent')}
            />
          )}

          <CallControls
            micEnabled={micEnabled}
            cameraEnabled={cameraEnabled}
            onToggleMic={() => setMicEnabled(!micEnabled)}
            onToggleCamera={() => setCameraEnabled(!cameraEnabled)}
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
    backgroundColor: '#000',
  },

  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 20,
  },

  subtitle: {
    color: '#aaa',
    marginTop: 10,
    marginBottom: 30,
  },

  startButton: {
    width: 260,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#7C4DFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeButton: {
    width: 260,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: '#fff',
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
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
  },

  country: {
    color: '#ddd',
    marginTop: 5,
  },

  timer: {
    color: '#00E676',
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
  },
});

import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

export const requestCameraPermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.CAMERA);

  return result === RESULTS.GRANTED;
};

export const requestMicrophonePermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);

  return result === RESULTS.GRANTED;
};

export const requestVideoCallPermissions = async () => {
  const camera = await requestCameraPermission();

  const mic = await requestMicrophonePermission();

  return camera && mic;
};

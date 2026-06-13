import { useContext } from 'react';
import CallContext from '../context/CallContext';

export default function useVideoCall() {
  return useContext(CallContext);
}

import { useSelector, useDispatch } from 'react-redux';

import { addMessage, setMessages } from '../redux/slices/chatSlice';

export default function useChat() {
  const dispatch = useDispatch();

  const chat = useSelector(state => state.chat);

  const sendMessage = message => {
    dispatch(addMessage(message));
  };

  const updateMessages = messages => {
    dispatch(setMessages(messages));
  };

  return {
    ...chat,
    sendMessage,
    updateMessages,
  };
}

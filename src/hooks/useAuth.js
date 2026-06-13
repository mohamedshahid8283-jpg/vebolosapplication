import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../redux/slices/authSlice';

export default function useAuth() {
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  const login = userData => {
    dispatch(loginUser(userData));
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return {
    ...auth,
    login,
    logout,
  };
}

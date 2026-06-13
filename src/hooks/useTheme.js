import { useSelector } from 'react-redux';

export default function useTheme() {
  const theme = useSelector(state => state.theme);

  const isDark = theme.mode === 'dark';

  return {
    isDark,

    colors: {
      background: isDark ? '#0F1115' : '#F7F8FA',

      card: isDark ? '#1B1E24' : '#FFFFFF',

      text: isDark ? '#FFFFFF' : '#000000',

      subText: isDark ? '#AAAAAA' : '#666666',

      border: isDark ? '#252A32' : '#EEEEEE',

      primary: '#7C4DFF',

      success: '#00E676',

      danger: '#FF3B30',
    },
  };
}

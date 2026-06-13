import AsyncStorage from '@react-native-async-storage/async-storage';

const storageService = {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  },

  getItem: async key => {
    try {
      const value = await AsyncStorage.getItem(key);

      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log(error);

      return null;
    }
  },

  removeItem: async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  },

  clearStorage: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  },
};

export default storageService;

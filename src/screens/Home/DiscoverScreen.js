import React, { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import SearchBar from '../../components/common/SearchBar';
import useAppTheme from '../../theme/useTheme';

export default function DiscoverScreen({ navigation }) {
  const colors = useAppTheme();

  const [search, setSearch] = useState('');

  const users = [
    {
      id: '1',
      name: 'Sophia',
      age: 22,
      country: 'Germany',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: '2',
      name: 'Emma',
      age: 24,
      country: 'USA',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
    },
    {
      id: '3',
      name: 'Olivia',
      age: 21,
      country: 'Australia',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search people..."
      />

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.userCard,
              {
                backgroundColor: colors.card,
              },
            ]}
            onPress={() =>
              navigation.navigate('UserDetails', {
                user: item,
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 18,
                  fontWeight: '700',
                }}
              >
                {item.name}
              </Text>

              <Text
                style={{
                  color: colors.subText,
                }}
              >
                {item.age} • {item.country}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  userCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 18,
    marginBottom: 12,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  info: {
    marginLeft: 15,
    justifyContent: 'center',
  },
});

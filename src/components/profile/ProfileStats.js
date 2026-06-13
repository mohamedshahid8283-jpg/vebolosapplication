import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import useAppTheme from '../../theme/useTheme';

export default function ProfileStats({
  friends = 120,
  followers = 250,
  following = 180,
}) {
  const colors = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
        },
      ]}
    >
      <View style={styles.item}>
        <Text
          style={[
            styles.number,
            {
              color: colors.text,
            },
          ]}
        >
          {friends}
        </Text>

        <Text
          style={[
            styles.label,
            {
              color: colors.subText,
            },
          ]}
        >
          Friends
        </Text>
      </View>

      <View
        style={[
          styles.divider,
          {
            backgroundColor: '#E5E5E5',
          },
        ]}
      />

      <View style={styles.item}>
        <Text
          style={[
            styles.number,
            {
              color: colors.text,
            },
          ]}
        >
          {followers}
        </Text>

        <Text
          style={[
            styles.label,
            {
              color: colors.subText,
            },
          ]}
        >
          Followers
        </Text>
      </View>

      <View
        style={[
          styles.divider,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: '#E5E5E5',
          },
        ]}
      />

      <View style={styles.item}>
        <Text
          style={[
            styles.number,
            {
              color: colors.text,
            },
          ]}
        >
          {following}
        </Text>

        <Text
          style={[
            styles.label,
            {
              color: colors.subText,
            },
          ]}
        >
          Following
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    justifyContent: 'space-around',
    alignItems: 'center',

    borderRadius: 24,

    paddingVertical: 20,
    marginBottom: 20,
  },

  item: {
    flex: 1,
    alignItems: 'center',
  },

  number: {
    fontSize: 22,
    fontWeight: '800',
  },

  label: {
    marginTop: 5,
    fontSize: 13,
  },

  divider: {
    width: 1,
    height: 40,
  },
});

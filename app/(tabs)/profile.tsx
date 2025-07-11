import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
  },
}); 
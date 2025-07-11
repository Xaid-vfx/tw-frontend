import React, { useContext } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from './_layout';

export default function ProfileScreen() {
  const { theme } = useContext(ThemeContext);
  const themeObj = theme === 'dark' ? {
    background: '#181A20', text: '#fff',
  } : {
    background: '#fff', text: '#222',
  };
  return (
    <View style={[styles.container, { backgroundColor: themeObj.background }] }>
      <Text style={[styles.header, { color: themeObj.text }]}>Profile</Text>
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
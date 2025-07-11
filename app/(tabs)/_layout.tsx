import { Tabs } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

function FloatingNewChatButton({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={styles.fab}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.fabLabel}>New chat</Text>
    </View>
  );
}

export default function TabLayout() {
  // Replace with your navigation logic for new chat
  const handleNewChat = () => {
    // TODO: Implement navigation or modal for new chat
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#222',
          tabBarInactiveTintColor: '#B0B0B0',
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            textTransform: 'capitalize',
            marginBottom: 4,
          },
          tabBarStyle: {
            height: 90,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: '#fff',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            shadowColor: '#222',
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 8,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={18} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <Feather name="user" size={18} color={color} />
            ),
          }}
        />
      </Tabs>
      <FloatingNewChatButton onPress={handleNewChat} />
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 36,
    alignItems: 'center',
    zIndex: 20,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#222',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#fff',
  },
  fabLabel: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '500',
    color: '#222',
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
    textAlign: 'center',
    letterSpacing: 0.1,
  },
});

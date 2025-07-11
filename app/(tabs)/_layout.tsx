import { Tabs } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text, Modal, Animated, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function FloatingNewChatButton({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.fabContainer} pointerEvents="box-none">
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

function ChatModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 420,
        useNativeDriver: true,
        easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 320,
        useNativeDriver: true,
        easing: (t) => t * t,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="none" transparent>
      <Animated.View style={[styles.chatModal, { transform: [{ translateY }] }]}> 
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Chat</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={28} color="#222" />
            </TouchableOpacity>
          </View>
          <View style={styles.chatBody}>
            <View style={styles.bubbleAI}>
              <Text style={styles.bubbleTextAI}>Hi! I’m your Tezza. How can I help you and your partner today?</Text>
            </View>
            <View style={styles.bubbleUser}>
              <Text style={styles.bubbleTextUser}>How can we improve our communication?</Text>
            </View>
          </View>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#AAA"
            />
            <TouchableOpacity style={styles.sendBtn}>
              <Ionicons name="send" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}

export default function TabLayout() {
  const [showChat, setShowChat] = useState(false);

  const handleNewChat = () => setShowChat(true);
  const handleCloseChat = () => setShowChat(false);

  return (
    <View style={{ flex: 1 }}>
      {!showChat && (
        <>
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
        </>
      )}
      <ChatModal visible={showChat} onClose={handleCloseChat} />
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
    pointerEvents: 'box-none',
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
  chatModal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#222',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 16,
    overflow: 'hidden',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222',
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
  },
  closeBtn: {
    padding: 6,
    borderRadius: 20,
  },
  chatBody: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-end',
  },
  bubbleAI: {
    alignSelf: 'flex-start',
    backgroundColor: '#F7F6FF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    maxWidth: '80%',
  },
  bubbleTextAI: {
    color: '#4F6AF6',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#ECEAFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    maxWidth: '80%',
  },
  bubbleTextUser: {
    color: '#222',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#F7F6FF',
    borderRadius: 16,
    marginRight: 10,
    color: '#222',
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
  },
  sendBtn: {
    backgroundColor: '#4F6AF6',
    borderRadius: 16,
    padding: 10,
  },
});

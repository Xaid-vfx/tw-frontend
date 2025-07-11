import { Tabs } from 'expo-router';
import React, { useRef, useState, createContext, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text, Modal, Animated, Dimensions, TextInput, KeyboardAvoidingView, Easing } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

interface ThemeColors {
  background: string;
  text: string;
  secondaryText: string;
  card: string;
  accent: string;
  fab: string;
  fabText: string;
  tabBar: string;
  tabActive: string;
  tabInactive: string;
  inputBg: string;
  bubbleAI: string;
  bubbleUser: string;
  border: string;
  shadow: string;
}

type ThemeType = 'light' | 'dark';
const themes: Record<ThemeType, ThemeColors> = {
  light: {
    background: '#fff',
    text: '#222',
    secondaryText: '#555',
    card: '#FAFAFA',
    accent: '#4F6AF6',
    fab: '#222',
    fabText: '#fff',
    tabBar: '#fff',
    tabActive: '#222',
    tabInactive: '#B0B0B0',
    inputBg: '#F7F7F8',
    bubbleAI: '#F7F6FF',
    bubbleUser: '#ECEAFF',
    border: '#F0F0F0',
    shadow: '#222',
  },
  dark: {
    background: '#181A20',
    text: '#fff',
    secondaryText: '#AAA',
    card: '#23242A',
    accent: '#7C6BFF',
    fab: '#fff',
    fabText: '#222',
    tabBar: '#23242A',
    tabActive: '#fff',
    tabInactive: '#555',
    inputBg: '#23242A',
    bubbleAI: '#23242A',
    bubbleUser: '#35364A',
    border: '#23242A',
    shadow: '#000',
  },
};

export { ThemeContext };

function FloatingNewChatButton({ onPress }: { onPress: () => void }) {
  const { theme } = useContext(ThemeContext);
  const themeObj = themes[theme as ThemeType];
  return (
    <View style={styles.fabContainer} pointerEvents="box-none">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={[styles.fab, { backgroundColor: themeObj.fab, shadowColor: themeObj.shadow, borderColor: themeObj.background }]}
      >
        <Ionicons name="add" size={24} color={themeObj.fabText} />
      </TouchableOpacity>
      <Text style={[styles.fabLabel, { color: themeObj.fab } ]}>New chat</Text>
    </View>
  );
}

function ChatModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { theme } = useContext(ThemeContext);
  const themeObj = themes[theme as ThemeType];
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [isAnimating, setIsAnimating] = useState(false);

  React.useEffect(() => {
    if (visible) {
      setIsAnimating(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }).start(() => setIsAnimating(false));
    } else {
      setIsAnimating(true);
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic),
      }).start(() => {
        setIsAnimating(false);
        onClose();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible && !isAnimating) return null;

  return (
    <Modal visible={true} animationType="none" transparent>
      <Animated.View style={[styles.chatModal, { backgroundColor: themeObj.background, shadowColor: themeObj.shadow, borderColor: themeObj.border, transform: [{ translateY }] }]}> 
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={[styles.chatHeader, { backgroundColor: themeObj.background, borderColor: themeObj.border }] }>
            <Text style={[styles.chatTitle, { color: themeObj.text }]}>Chat</Text>
            <TouchableOpacity onPress={() => { if (!isAnimating) onClose(); }} style={styles.closeBtn} disabled={isAnimating}>
              <Ionicons name="close" size={28} color={themeObj.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.chatBody}>
            <View style={[styles.bubbleAI, { backgroundColor: themeObj.bubbleAI }] }>
              <Text style={[styles.bubbleTextAI, { color: themeObj.accent } ]}>Hi! I’m your Tezza. How can I help you and your partner today?</Text>
            </View>
            <View style={[styles.bubbleUser, { backgroundColor: themeObj.bubbleUser }] }>
              <Text style={[styles.bubbleTextUser, { color: themeObj.text } ]}>How can we improve our communication?</Text>
            </View>
          </View>
          <View style={[styles.inputBar, { backgroundColor: 'transparent' }] }>
            <TextInput
              style={[styles.input, { backgroundColor: themeObj.inputBg, color: themeObj.text }]}
              placeholder="Type a message..."
              placeholderTextColor={themeObj.secondaryText}
            />
            <TouchableOpacity style={[styles.sendBtn, { backgroundColor: themeObj.accent, shadowColor: themeObj.accent }] }>
              <Ionicons name="send" size={22} color={themeObj.fabText} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}

export default function TabLayout() {
  const [showChat, setShowChat] = useState(false);
  const [theme, setTheme] = useState<ThemeType>('light');
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  const themeObj = themes[theme];

  const handleNewChat = () => setShowChat(true);
  const handleCloseChat = () => setShowChat(false);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <View style={{ flex: 1, backgroundColor: themeObj.background }}>
        {!showChat && (
          <>
            <Tabs
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: themeObj.tabActive,
                tabBarInactiveTintColor: themeObj.tabInactive,
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
                  backgroundColor: themeObj.tabBar,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  shadowColor: themeObj.shadow,
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
    </ThemeContext.Provider>
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
    paddingTop: Platform.OS === 'android' ? 48 : 56,
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
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
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 36,
    paddingTop: 8,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    gap: 0,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#F7F7F8',
    borderRadius: 28,
    color: '#222',
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
    marginRight: -36, // overlap send button
    borderWidth: 0,
    minHeight: 48,
    shadowColor: 'transparent',
  },
  sendBtn: {
    backgroundColor: '#4F6AF6',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    shadowColor: '#4F6AF6',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
});

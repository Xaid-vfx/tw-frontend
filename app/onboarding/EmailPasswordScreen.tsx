import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import useOnboardingStore from '../../hooks/useOnboardingStore';

export default function EmailPasswordScreen() {
  const router = useRouter();
  const { email, setEmail, password, setPassword } = useOnboardingStore();
  const [emailInput, setEmailInput] = useState(email || '');
  const [passwordInput, setPasswordInput] = useState(password || '');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: '71%' }]} />
      </View>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}> 
        <Text style={styles.title}>Set up your account</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={emailInput}
          onChangeText={setEmailInput}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#B0B0D0"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={passwordInput}
          onChangeText={setPasswordInput}
          secureTextEntry
          placeholderTextColor="#B0B0D0"
        />
        <TouchableOpacity
          style={[styles.button, (!emailInput || !passwordInput) && { opacity: 0.5 }]}
          disabled={!emailInput || !passwordInput}
          onPress={() => {
            setEmail(emailInput);
            setPassword(passwordInput);
            router.push('/onboarding/InvitePartnerScreen');
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    marginBottom: 32,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 2,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    padding: 8,
  },
  backText: {
    color: '#6C63FF',
    fontSize: 28,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    color: '#23243A',
    marginBottom: 32,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  input: {
    width: '100%',
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#F7F7FA',
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 0,
    color: '#23243A',
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 32,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
}); 
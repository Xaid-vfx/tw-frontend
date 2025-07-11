import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export default function InvitePartnerScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [inviteCode] = useState('ABCD1234'); // Placeholder code
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
        <View style={[styles.progressBarFill, { width: '85%' }]} />
      </View>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}> 
        <Text style={styles.title}>Invite your partner</Text>
        <TextInput
          style={styles.input}
          placeholder="Partner's Email (optional)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#B0B0D0"
        />
        <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding/SuccessScreen')}>
          <Text style={styles.buttonText}>Send Invite / Next</Text>
        </TouchableOpacity>
        <View style={styles.codeBox}>
          <Text style={styles.codeLabel}>Your Invite Code</Text>
          <Text style={styles.code}>{inviteCode}</Text>
        </View>
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
  codeBox: {
    marginTop: 24,
    backgroundColor: '#F7F7FA',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  codeLabel: {
    color: '#5A5A89',
    fontSize: 16,
    marginBottom: 4,
  },
  code: {
    color: '#6C63FF',
    fontSize: 22,
    fontWeight: 'bold',
  },
}); 
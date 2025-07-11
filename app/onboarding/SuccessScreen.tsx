import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import useOnboardingStore from '../../hooks/useOnboardingStore';

export default function SuccessScreen() {
  const router = useRouter();
  const { setOnboardingComplete } = useOnboardingStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleFinish = () => {
    setOnboardingComplete(true);
    router.replace('/(tabs)');
  };

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
        <View style={[styles.progressBarFill, { width: '100%' }]} />
      </View>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}> 
        <Text style={styles.title}>You&apos;re all set!</Text>
        <Text style={styles.subtitle}>Welcome to thirdwheel. Your journey together starts now.</Text>
        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>Start</Text>
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
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  subtitle: {
    fontSize: 16,
    color: '#5A5A89',
    marginBottom: 48,
    textAlign: 'center',
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
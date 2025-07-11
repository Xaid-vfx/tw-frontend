import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <LinearGradient colors={["#7F9CF5", "#E0C3FC"]} style={styles.gradient}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}> 
        {/* 3D-style illustration placeholder */}
        <View style={styles.illustrationWrapper}>
          {/* <Image
            source={require('../../assets/illustrations/onboarding-3d-placeholder.png')}
            style={styles.illustration}
            resizeMode="contain"
          /> */}
        </View>
        <Text style={styles.title}>Welcome to ThirdWheel</Text>
        <Text style={styles.subtitle}>A calm, private space for you and your partner to grow together.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('./NameScreen')} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  illustrationWrapper: {
    width: 240,
    height: 220,
    marginBottom: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 220,
    height: 200,
  },
  title: {
    fontSize: 22,
    color: '#F8F8FF',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
    letterSpacing: 0.1,
  },
  subtitle: {
    fontSize: 15,
    color: '#D1D5F0',
    marginBottom: 48,
    textAlign: 'center',
    opacity: 0.95,
    lineHeight: 22,
    fontFamily: 'Quicksand',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 32,
    width: '100%',
    alignItems: 'center',
    shadowColor: 'transparent',
    marginTop: 8,
  },
  buttonText: {
    color: '#6C63FF',
    fontSize: 16,
    letterSpacing: 0.1,
    fontFamily: 'Quicksand-SemiBold',
  },
}); 
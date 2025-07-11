import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import useOnboardingStore from '../../hooks/useOnboardingStore';

const RELATIONSHIP_STATUSES = [
  'Dating',
  'Engaged',
  'Married',
  'Domestic Partnership',
  'Other',
];

export default function RelationshipScreen() {
  const router = useRouter();
  const { relationshipStatus, setRelationshipStatus } = useOnboardingStore();
  const [selected, setSelected] = useState(relationshipStatus || '');
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
        <View style={[styles.progressBarFill, { width: '57%' }]} />
      </View>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}> 
        <Text style={styles.title}>What is your relationship status?</Text>
        <View style={styles.options}>
          {RELATIONSHIP_STATUSES.map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.option, selected === status && styles.selectedOption]}
              onPress={() => {
                setSelected(status);
                setRelationshipStatus(status);
                router.push('/onboarding/EmailPasswordScreen');
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.optionText, selected === status && styles.selectedOptionText]}>{status}</Text>
            </TouchableOpacity>
          ))}
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
  options: {
    width: '100%',
    marginBottom: 32,
  },
  option: {
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#F7F7FA',
    borderWidth: 0,
    marginBottom: 14,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#6C63FF',
  },
  optionText: {
    fontSize: 16,
    color: '#23243A',
  },
  selectedOptionText: {
    color: '#fff',
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
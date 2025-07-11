import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default function OnboardingProgress({ step, total }: { step: number; total: number }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            i < step ? styles.activeDot : styles.inactiveDot,
            i === step - 1 && styles.glowDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 6,
    backgroundColor: '#E0E7FF',
  },
  activeDot: {
    backgroundColor: '#7F9CF5',
  },
  inactiveDot: {
    backgroundColor: '#E0E7FF',
    opacity: 0.5,
  },
  glowDot: {
    shadowColor: '#7F9CF5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 4,
  },
}); 
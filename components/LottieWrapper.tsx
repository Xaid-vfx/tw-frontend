import React from 'react';
import { Platform } from 'react-native';

let LottieComponent: any = null;

if (Platform.OS === 'web') {
  LottieComponent = require('lottie-react').default;
} else {
  LottieComponent = require('lottie-react-native').default;
}

export default function LottieWrapper(props: any) {
  return <LottieComponent {...props} />;
} 
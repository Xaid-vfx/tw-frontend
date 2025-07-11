import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OnboardingState = {
  name: string;
  age: string;
  gender: string;
  relationshipStatus: string;
  email: string;
  password: string;
  photo: string;
  onboardingComplete: boolean;
  setName: (name: string) => void;
  setAge: (age: string) => void;
  setGender: (gender: string) => void;
  setRelationshipStatus: (status: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPhoto: (photo: string) => void;
  setOnboardingComplete: (complete: boolean) => void;
  reset: () => void;
};

const useOnboardingStore = create<OnboardingState>((set) => ({
  name: '',
  age: '',
  gender: '',
  relationshipStatus: '',
  email: '',
  password: '',
  photo: '',
  onboardingComplete: false,
  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
  setGender: (gender) => set({ gender }),
  setRelationshipStatus: (relationshipStatus) => set({ relationshipStatus }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setPhoto: (photo) => set({ photo }),
  setOnboardingComplete: (onboardingComplete) => {
    set({ onboardingComplete });
    AsyncStorage.setItem('onboardingComplete', onboardingComplete ? 'true' : '');
  },
  reset: () => set({
    name: '',
    age: '',
    gender: '',
    relationshipStatus: '',
    email: '',
    password: '',
    photo: '',
    onboardingComplete: false,
  }),
}));

export default useOnboardingStore; 
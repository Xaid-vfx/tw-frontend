import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { ThemeContext } from './_layout';

export default function HomeScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeObj = theme === 'dark' ? {
    background: '#181A20', text: '#fff', secondaryText: '#AAA', card: '#23242A', accent: '#7C6BFF', fab: '#fff', fabText: '#222', tabBar: '#23242A', tabActive: '#fff', tabInactive: '#555', inputBg: '#23242A', bubbleAI: '#23242A', bubbleUser: '#35364A', border: '#23242A', shadow: '#000',
  } : {
    background: '#fff', text: '#222', secondaryText: '#555', card: '#FAFAFA', accent: '#4F6AF6', fab: '#222', fabText: '#fff', tabBar: '#fff', tabActive: '#222', tabInactive: '#B0B0B0', inputBg: '#F7F7F8', bubbleAI: '#F7F6FF', bubbleUser: '#ECEAFF', border: '#F0F0F0', shadow: '#222',
  };

  const updates = [
    {
      id: 1,
      color: theme === 'dark' ? '#23242A' : '#D6E6FB',
      icon: (
        <View style={[styles.aiBadge, { backgroundColor: theme === 'dark' ? '#23242A' : '#EDF6FF' }] }><Text style={[styles.aiBadgeText, { color: themeObj.accent }]}>AI</Text></View>
      ),
      title: 'Engine update',
      subtitle: 'New AI therapist features',
    },
    {
      id: 2,
      color: theme === 'dark' ? '#35364A' : '#E6D6FB',
      icon: (
        <View style={[styles.leafIcon, { backgroundColor: theme === 'dark' ? '#35364A' : '#F3EDFF' }] }><Feather name="activity" size={18} color={themeObj.accent} /></View>
      ),
      title: 'New principles',
      subtitle: 'Relationship therapy techniques',
    },
  ];

  const chatHistory = [
    {
      id: 1,
      icon: 'zap' as const,
      question: 'How can I improve communication with my partner?',
      subtitle: 'in a way that builds trust and understanding',
    },
    {
      id: 2,
      icon: 'zap' as const,
      question: 'Generate a personalized exercise plan',
      subtitle: 'for couples to practice active listening techniques',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeObj.background }] }>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.appTitle, { color: themeObj.text }]}>ThirdWheel</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name="search" size={22} color={themeObj.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
            <Feather name={theme === 'dark' ? 'sun' : 'moon'} size={22} color={themeObj.text} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 32}}>
        {/* Updates Section */}
        <Text style={[styles.sectionTitle, { color: themeObj.text }]}>Updates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.updatesRow}>
          {updates.map((item) => (
            <View key={item.id} style={[styles.updateCard, {backgroundColor: item.color}]}> 
              {item.icon}
              <Text style={[styles.updateTitle, { color: themeObj.text }]}>{item.title}</Text>
              <Text style={[styles.updateSubtitle, { color: themeObj.secondaryText }]}>{item.subtitle}</Text>
            </View>
          ))}
        </ScrollView>
        {/* Chat History Section */}
        <Text style={[styles.sectionTitle, { color: themeObj.text }]}>Chat history</Text>
        <View style={styles.chatHistoryList}>
          {chatHistory.map((item) => (
            <View key={item.id} style={[styles.chatCard, { backgroundColor: themeObj.card, borderColor: themeObj.border }] }>
              <Feather name={item.icon} size={18} color={themeObj.accent} style={{marginRight: 10}} />
              <View style={{flex: 1}}>
                <Text style={[styles.chatQuestion, { color: themeObj.text }]}>{item.question}</Text>
                <Text style={[styles.chatSubtitle, { color: themeObj.secondaryText }]}>{item.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 48 : 56,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 8,
  },
  appTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#222',
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
  },
  searchBtn: {
    padding: 8,
    borderRadius: 20,
  },
  themeBtn: {
    padding: 8,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 18,
    marginTop: 14,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
  },
  updatesRow: {
    flexGrow: 0,
    marginBottom: 22,
  },
  updateCard: {
    width: 160,
    height: 150,
    borderRadius: 20,
    marginRight: 14,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  aiBadge: {
    backgroundColor: '#EDF6FF',
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 8,
  },
  aiBadgeText: {
    color: '#6C5DD3',
    fontWeight: '700',
    fontSize: 13,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
  },
  leafIcon: {
    backgroundColor: '#F3EDFF',
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 8,
  },
  updateTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
  },
  updateSubtitle: {
    fontSize: 13,
    color: '#555',
    fontWeight: '400',
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
  },
  chatHistoryList: {
    marginTop: 2,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  chatQuestion: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    marginBottom: 8,
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
  },
  chatSubtitle: {
    fontSize: 13,
    color: '#888',
    fontWeight: '400',
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
  },
  fabLabel: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    fontFamily: Platform.select({ ios: 'System', android: 'sans-serif', default: undefined }),
    textAlign: 'center',
    letterSpacing: 0.1,
  },
});


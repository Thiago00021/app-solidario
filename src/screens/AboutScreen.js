import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
export default function AboutScreen() {
  return (
    <SafeAreaView style={s.c}>
      <Text style={s.t}>Sobre o DoeMais 💚</Text>
      <Text style={s.p}>App solidário para conectar pessoas que querem doar roupas, alimentos e móveis a quem precisa.</Text>
      <Text style={s.p}>Desenvolvido com React Native + Expo SDK 54 + SQLite.</Text>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  c: { flex: 1, padding: 24, backgroundColor: '#F1F8E9' },
  t: { fontSize: 26, fontWeight: 'bold', color: '#2E7D32', marginTop: 40, textAlign: 'center' },
  p: { fontSize: 16, color: '#444', marginTop: 16, lineHeight: 24, textAlign: 'center' },
});

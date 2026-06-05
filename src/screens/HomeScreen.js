import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  const categorias = [
    { nome: 'Roupas', emoji: '👕', cor: '#FFB74D' },
    { nome: 'Alimentos', emoji: '🍎', cor: '#E57373' },
    { nome: 'Móveis', emoji: '🛋️', cor: '#64B5F6' },
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F1F8E9' }}>
      <ScrollView contentContainerStyle={s.container}>
        <Text style={s.title}>DoeMais 💚</Text>
        <Text style={s.subtitle}>Conectando quem doa a quem precisa</Text>

        <View style={s.grid}>
          {categorias.map(c => (
            <TouchableOpacity key={c.nome} style={[s.card, { backgroundColor: c.cor }]}
              onPress={() => navigation.navigate('Doações', { screen: 'DonationsList', params: { categoria: c.nome } })}>
              <Text style={s.emoji}>{c.emoji}</Text>
              <Text style={s.cardText}>{c.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={s.cta}
          onPress={() => navigation.navigate('Doações', { screen: 'DonationForm' })}>
          <Text style={s.ctaText}>+ Cadastrar Doação</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2E7D32', textAlign: 'center', marginTop: 20 },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', aspectRatio: 1, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  emoji: { fontSize: 48 },
  cardText: { fontSize: 18, fontWeight: '600', color: '#fff', marginTop: 8 },
  cta: { backgroundColor: '#2E7D32', padding: 16, borderRadius: 12, marginTop: 20 },
  ctaText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});

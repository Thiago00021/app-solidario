import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { listDonations } from '../database/db';
import DonationCard from '../components/DonationCard';

const CATS = ['Todas', 'Roupas', 'Alimentos', 'Móveis'];

export default function DonationsListScreen({ navigation, route }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(route.params?.categoria || 'Todas');

  const load = useCallback(async () => {
    const data = await listDonations(filter);
    setItems(data);
  }, [filter]);

  useFocusEffect(useCallback(() => { load(); }, [load]));
  useEffect(() => { load(); }, [filter, load]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filters}>
        {CATS.map(c => (
          <TouchableOpacity key={c} onPress={() => setFilter(c)}
            style={[s.chip, filter === c && s.chipActive]}>
            <Text style={[s.chipText, filter === c && s.chipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={items}
        keyExtractor={i => String(i.id)}
        renderItem={({ item }) => (
          <DonationCard item={item} onPress={() => navigation.navigate('DonationDetail', { id: item.id })} />
        )}
        ListEmptyComponent={<Text style={s.empty}>Nenhuma doação cadastrada ainda.</Text>}
        contentContainerStyle={{ padding: 16 }}
      />

      <TouchableOpacity style={s.fab} onPress={() => navigation.navigate('DonationForm')}>
        <Text style={s.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  filters: { padding: 12, maxHeight: 60 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#E0E0E0', marginRight: 8, height: 36 },
  chipActive: { backgroundColor: '#2E7D32' },
  chipText: { color: '#333' },
  chipTextActive: { color: '#fff', fontWeight: 'bold' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40 },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#2E7D32', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  fabText: { color: '#fff', fontSize: 30 },
});

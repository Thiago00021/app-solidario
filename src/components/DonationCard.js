import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import CategoryBadge from './CategoryBadge';

export default function DonationCard({ item, onPress }) {
  return (
    <TouchableOpacity style={s.card} onPress={onPress}>
      <CategoryBadge category={item.category} />
      <Text style={s.title}>{item.title}</Text>
      <Text style={s.sub}>{item.donor_name} {item.city ? `• ${item.city}` : ''}</Text>
    </TouchableOpacity>
  );
}
const s = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, backgroundColor: '#FAFAFA', marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#2E7D32' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#222', marginTop: 6 },
  sub: { fontSize: 13, color: '#777', marginTop: 4 },
});

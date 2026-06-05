import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const cores = { Roupas: '#FFB74D', Alimentos: '#E57373', Móveis: '#64B5F6' };
export default function CategoryBadge({ category }) {
  return (
    <View style={[s.b, { backgroundColor: cores[category] || '#999' }]}>
      <Text style={s.t}>{category}</Text>
    </View>
  );
}
const s = StyleSheet.create({
  b: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  t: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});

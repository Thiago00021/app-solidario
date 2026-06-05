import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getDonation, deleteDonation } from '../database/db';
import CategoryBadge from '../components/CategoryBadge';

export default function DonationDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [item, setItem] = useState(null);

  useFocusEffect(useCallback(() => {
    getDonation(id).then(setItem);
  }, [id]));

  const remover = () => {
    Alert.alert('Confirmar', 'Deseja excluir esta doação?', [
      { text: 'Cancelar' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        await deleteDonation(id);
        navigation.goBack();
      }}
    ]);
  };

  if (!item) return <View style={s.center}><Text>Carregando...</Text></View>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={s.container}>
        <CategoryBadge category={item.category} />
        <Text style={s.title}>{item.title}</Text>
        <Text style={s.desc}>{item.description || 'Sem descrição.'}</Text>

        <View style={s.info}>
          <Text style={s.infoLabel}>Doador:</Text><Text>{item.donor_name}</Text>
          <Text style={s.infoLabel}>Contato:</Text><Text>{item.contact}</Text>
          <Text style={s.infoLabel}>Cidade:</Text><Text>{item.city || '—'}</Text>
        </View>

        <TouchableOpacity style={[s.btn, { backgroundColor: '#1976D2' }]}
          onPress={() => navigation.navigate('DonationForm', { id })}>
          <Text style={s.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.btn, { backgroundColor: '#D32F2F' }]} onPress={remover}>
          <Text style={s.btnText}>Excluir</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginTop: 12, color: '#222' },
  desc: { fontSize: 16, color: '#555', marginTop: 8, lineHeight: 22 },
  info: { marginTop: 20, padding: 16, backgroundColor: '#F5F5F5', borderRadius: 12 },
  infoLabel: { fontWeight: 'bold', marginTop: 6, color: '#333' },
  btn: { padding: 14, borderRadius: 10, marginTop: 16 },
  btnText: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
});

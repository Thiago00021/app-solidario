import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { createDonation, updateDonation, getDonation } from '../database/db';

const CATS = ['Roupas', 'Alimentos', 'Móveis'];

export default function DonationFormScreen({ navigation, route }) {
  const editId = route.params?.id;
  const [form, setForm] = useState({
    title: '', description: '', category: 'Roupas', donor_name: '', contact: '', city: ''
  });

  useEffect(() => {
    if (editId) getDonation(editId).then(d => d && setForm(d));
  }, [editId]);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const salvar = async () => {
    if (!form.title || !form.donor_name || !form.contact) {
      Alert.alert('Atenção', 'Preencha título, nome e contato.');
      return;
    }
    try {
      if (editId) await updateDonation(editId, form);
      else await createDonation(form);
      Alert.alert('Sucesso', 'Doação salva!');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', e.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={s.container}>
        <Text style={s.label}>Título *</Text>
        <TextInput style={s.input} value={form.title} onChangeText={t => set('title', t)} placeholder="Ex: Casaco de inverno" />

        <Text style={s.label}>Categoria *</Text>
        <View style={s.row}>
          {CATS.map(c => (
            <TouchableOpacity key={c} onPress={() => set('category', c)}
              style={[s.chip, form.category === c && s.chipActive]}>
              <Text style={[s.chipText, form.category === c && { color: '#fff' }]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.label}>Descrição</Text>
        <TextInput style={[s.input, { height: 80 }]} multiline value={form.description} onChangeText={t => set('description', t)} />

        <Text style={s.label}>Seu nome *</Text>
        <TextInput style={s.input} value={form.donor_name} onChangeText={t => set('donor_name', t)} />

        <Text style={s.label}>Contato (telefone/WhatsApp) *</Text>
        <TextInput style={s.input} keyboardType="phone-pad" value={form.contact} onChangeText={t => set('contact', t)} />

        <Text style={s.label}>Cidade</Text>
        <TextInput style={s.input} value={form.city} onChangeText={t => set('city', t)} />

        <TouchableOpacity style={s.btn} onPress={salvar}>
          <Text style={s.btnText}>{editId ? 'Atualizar' : 'Cadastrar'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6, color: '#333' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, fontSize: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#EEE', marginRight: 8, marginBottom: 8 },
  chipActive: { backgroundColor: '#2E7D32' },
  chipText: { color: '#333' },
  btn: { backgroundColor: '#2E7D32', padding: 16, borderRadius: 12, marginTop: 24 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});

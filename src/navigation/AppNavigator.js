import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DonationListScreen from '../screens/DonationListScreen';
import DonationFormScreen from '../screens/DonationFormScreen';
import DonationDetailScreen from '../screens/DonationDetailScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DonationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#2E7D32' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="DonationList" component={DonationListScreen} options={{ title: 'Doações' }} />
      <Stack.Screen name="DonationForm" component={DonationFormScreen} options={{ title: 'Nova/Editar Doação' }} />
      <Stack.Screen name="DonationDetail" component={DonationDetailScreen} options={{ title: 'Detalhes' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#2E7D32',
          tabBarIcon: ({ color }) => {
            const icons = { Home: '🏠', Doações: '🎁', Sobre: 'ℹ️' };
            return <Text style={{ fontSize: 18, color }}>{icons[route.name]}</Text>;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Doações" component={DonationStack} />
        <Tab.Screen name="Sobre" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

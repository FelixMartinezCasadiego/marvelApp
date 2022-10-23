import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../screens/Account';
import useAuth from '../hooks/useAuth';

const Stack = createStackNavigator();

export default function AccountNavigation() {
    const {auth} = useAuth();
    return (
        <Stack.Navigator>
            <Stack.Screen name='Account' component={Account} options={{ title: auth ? "User" : "" }} />
        </Stack.Navigator>
    )
}
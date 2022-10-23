import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Character from '../screens/Character';
import Marvel from '../screens/Marvel';

const Stack = createStackNavigator();

export default function HomeNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Marvel' 
                component={Marvel}  
            />
            <Stack.Screen 
                name='Character' 
                component={Character}   
            />
            
        </Stack.Navigator>
    )
}
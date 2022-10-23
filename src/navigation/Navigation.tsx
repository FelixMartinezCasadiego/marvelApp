import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigation from './HomeNavigation';
import AccountNavigation from './AccountNavigation';
import useAuth from '../hooks/useAuth';

const Tab = createBottomTabNavigator();

export default function Navigation() {

    const {auth} = useAuth();

    return (

        <Tab.Navigator initialRouteName='Home'>

            { auth ? <Tab.Screen 
                name='Home' 
                component={HomeNavigation} 
                options={{
                    tabBarLabel:"Characters",
                    tabBarIcon: () => renderMarvelIcon(),
                }} 
            /> : null}

            <Tab.Screen 
                name='Account' 
                component={AccountNavigation} 
                options={{
                    tabBarLabel: auth ? "" : "Please Login",
                    tabBarIcon: () => renderUserIcon(),
                }}
            />

        </Tab.Navigator>

    )
}

function renderMarvelIcon() {
    return(
        <Image 
            source={require('../../assets/marvelIcon.jpg')}
            style={{width: 45, height: 45, top: - 10}}
        />
    )
}

function renderUserIcon() {
    return(  
        <Image 
            source={require('../../assets/userStan.png')} 
            style={{width: 50, height: 50, top: -10}}
        />
    )
}
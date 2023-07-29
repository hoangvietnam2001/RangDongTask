import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './Home';
import Tasks from './Tasks';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const Tab = createBottomTabNavigator();

const Drawers = createDrawerNavigator();

function MyTabs({navigation}:{navigation:any}) {
	return (
		<Tab.Navigator
			
			initialRouteName="HomeSub"
			screenOptions={({route}) => ({
				// tabBarShowLabel:false,
				tabBarActiveTintColor: '#4681A3',
				tabBarInactiveTintColor: '#ADAFB6',
				tabBarLabelStyle: {
					paddingBottom: 10,
					fontSize: 10,
				},
				tabBarStyle: {height: 60},
				tabBarLabel: () => {
					return null;
				},
				tabBarIcon: ({focused, color, size}) => {
					let iconName: any;
					let rn = route.name;

					if (rn === 'HomeSub') {
						iconName = focused ? 'home' : 'home-outline';
					} else if (rn === 'Tasks') {
						iconName = focused ? 'calendar-clear' : 'calendar-clear-outline';
					}
					//return anything here
					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}>
			<Tab.Screen
				name="HomeSub"
				component={Home}
				options={{
					title: 'Home',
					headerShown: false,
					headerTitleAlign: 'center',
					headerTransparent: false,
					
					headerLeftContainerStyle: {
						justifyContent: 'center',
						marginLeft: 18,
					},
					headerTitleStyle: {
						color: '#403572',
					},
				}}
			/>
			<Tab.Screen
				name="Tasks"
				component={Tasks}
				options={{
					headerShown: false,
					headerTitleAlign: 'center',
					headerTransparent: false,
					headerLeft: () => {
						return (
							<Ionicons
								onPress={() => {
									console.log('Xin hhh');
								}}
								name="menu"
								size={32}
								color={'#8B97A8'}></Ionicons>
						);
					},
					headerLeftContainerStyle: {
						justifyContent: 'center',
						marginLeft: 18,
					},
					headerTitleStyle: {
						color: '#403572',
					},
				}}
			/>
		</Tab.Navigator>
	);
}

export default function HomeScreen({navigation}:{navigation:any}) {
	return (
		//  <NavigationContainer independent={true}><NavigationContainer>
		<MyTabs navigation={navigation} />
	);
}

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
function Feed() {
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>Feed Screen</Text>
		</View>
	);
}

function Article() {
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>Article Screen</Text>
		</View>
	);
}

const Drawers = createDrawerNavigator();

export default function Drawer() {
	return (
		<Drawers.Navigator initialRouteName='Home'>
			<Drawers.Screen name="Login" component={LoginScreen} />
			<Drawers.Screen name="SignUp" component={SignUpScreen} />
			<Drawers.Screen name="Feed" component={Feed} />
			<Drawers.Screen name="Article" component={Article} />
		</Drawers.Navigator>
	);
}

const styles = StyleSheet.create({});

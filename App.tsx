import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

// import AuthManager from './src/components/AuthManager';

import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
// screen
import AddNewTaskScreen from './src/screens/AddNewTaskScreen';
import LoginScreen from './src/screens/LoginScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import Tasks from './src/screens/Tasks';
import TermsAndCondition from './src/screens/TermsAndCondition';
import PrivacyPolicy from './src/screens/PrivacyPolicy';

// name
const addNewTaskName = 'AddNewTask';
const loginName = 'Login';
const onboardingName = 'Onboarding';
const signUpName = 'SignUp';
const homeName = 'Home';
const taskName = 'Tasks';
const termAndConditionName = 'TermAndCondition';
const privacyAndPolicyName = 'PrivacyAndPolicy';
const homeDrawerName = 'HomeDrawer';

// khai bao navigation $ drawer
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeDrawer = ({navigation, props}: {navigation: any; props: any}) => {
	return (
		<Drawer.Navigator
			screenOptions={{
				drawerPosition: 'left',
				drawerType: 'front',

				drawerStyle: {
					backgroundColor: '#c6cbef',
					width: 240,
				},
			}}
			drawerContent={() => (
				<LoginedDrawer navigation={navigation} {...props} />
			)}>
			<Drawer.Screen name={homeName} component={HomeScreen} />
			<Drawer.Screen name={taskName} component={Tasks} />
			<Drawer.Screen
				name={termAndConditionName}
				component={TermsAndCondition}
			/>
			<Drawer.Screen name={privacyAndPolicyName} component={PrivacyPolicy} />
			{/* <Drawer.Screen name={signUpName} component={SignUpScreen}/>			 */}
		</Drawer.Navigator>
	);
};

const LoginedDrawer = ({navigation}: {navigation: any}) => {
	return (
		<DrawerContentScrollView>
			<DrawerItem
				label="Home"
				onPress={() => {
					navigation.navigate(homeName);
				}}
			/>
			<DrawerItem
				label="Task"
				onPress={() => {
					navigation.navigate('HomeDrawer', {screen: taskName});
				}}
			/>
			<DrawerItem
				label="Terms And Condition"
				onPress={() => {
					navigation.navigate(termAndConditionName);
				}}
			/>
			<DrawerItem
				label="Privacy and Policy"
				onPress={() => {
					navigation.navigate(privacyAndPolicyName);
				}}
			/>
			<DrawerItem
				label="Log out"
				onPress={() => {
					// handleLogout(navigation, loginName);
					auth()
						.signOut()
						.then(() => {
							navigation.navigate(loginName);
							console.log('You just log out');
						})
						.catch(error => {
							console.log('Have error:', error);
						});
				}}
			/>
		</DrawerContentScrollView>
	);
};

export default function App() {
	//console.log('Current userID', auth().currentUser.uid?auth().currentUser.uid:'Null');

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{}}>
				<Stack.Screen
					name={onboardingName}
					component={OnboardingScreen}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name={loginName}
					component={LoginScreen}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name={signUpName}
					component={SignUpScreen}
					options={{headerShown: false}}
				/>

				<Stack.Screen
					name={addNewTaskName}
					component={AddNewTaskScreen}
					options={{headerShown: true, title: ''}}
				/>
				<Stack.Screen
					name={homeDrawerName}
					component={HomeDrawer}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({});

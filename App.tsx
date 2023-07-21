import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createDrawerNavigator} from '@react-navigation/drawer';

// screen
import AddNewTaskScreen from './src/screens/AddNewTaskScreen';
import LoginScreen from './src/screens/LoginScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import Tasks from './src/screens/HomesScreen/Tasks';
import TermsAndCondition from './src/screens/TermsAndCondition';
import PrivacyPolicy from './src/screens/PrivacyPolicy';

// name
const addNewTaskName = 'AddNewTask';
const loginName = 'Login';
const onboardingName = 'Onboarding';
const signUpName = 'SignUp';
const homeName = 'Home';
const taskName='Tasks'

// khai bao navigation $ drawer
const Tab = createNativeStackNavigator();
const Draw = createDrawerNavigator();

const HomeDrawer = () => {
	return (
		<Draw.Navigator>
			<Draw.Screen name={homeName} component={HomeScreen} options={{headerShown:true,headerTitleAlign:'center'}}/>
			<Draw.Screen name={taskName} component={Tasks} options={{headerShown:true}}/>
			<Draw.Screen name='TermAndCondition' component={TermsAndCondition} options={{headerShown:true,title:'Term And Condition'}}/>
			<Draw.Screen name='PrivacyAndPolicy' component={PrivacyPolicy} options={{headerShown:true,title:'Privacy and Policy'}}/>
			<Draw.Screen name={loginName} component={LoginScreen} options={{headerShown:false,title:'Log out'}}/>
		</Draw.Navigator>
	);
};
export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator screenOptions={{}}>
				<Tab.Screen
					name={onboardingName}
					component={OnboardingScreen}
					options={{headerShown: false}}
				/>
				<Tab.Screen
					name={loginName}
					component={LoginScreen}
					options={{headerShown: false}}
				/>
				<Tab.Screen
					name={signUpName}
					component={SignUpScreen}
					options={{headerShown: false}}
				/>
				 <Tab.Screen
					name={addNewTaskName}
					component={AddNewTaskScreen}
					options={{headerShown: true, title:''}}
				/>
				<Tab.Screen name="HomeDrawer" component={HomeDrawer} options={{headerShown:false}}/>
				
				{/*
				<Tab.Screen
					name={homeName}
					component={HomeScreen}
					options={{
						title: 'Home',
						headerShown: false,
						headerStyle: {backgroundColor: 'blue'},
						headerTitleAlign: 'center',
					}}
				/> */}
				
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({});

import { AppState} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

export default function AuthManager() {
	useEffect(() => {
		AppState.addEventListener('change', handleAppStateChange);
		return () => {};
	}, []);

	const handleAppStateChange = appState => {
		if (appState === 'background' || appState === 'inactive') {
			signOutUser();
		}
	};

	const signOutUser = async () => {
		try {
			await auth().signOut();
			console.log('Signed out successfully');
		} catch (error) {
			console.log('Error signing out:', error);
		}
	};

	return null; // AuthManager không render giao diện, chỉ thực hiện xử lý logic
}

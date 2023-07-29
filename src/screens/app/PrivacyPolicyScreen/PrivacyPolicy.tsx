import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
export default function PrivacyPolicy({navigation}: {navigation: any}) {
	const handleSignOut = async () => {
		try {
			//await auth().signOut();
			// Ví dụ: navigation.navigate('LoginScreen');
			console.log('Logout thanh cong');
			navigation.push('SignUp');
		} catch (err) {
			console.log('Đăng xuất thất bại:', err);
		}
	};
	return (
		<View style={{justifyContent: 'center', alignItems: 'center'}}>
			<Text style={{fontSize: 32}}>Privacy and Policy</Text>
		</View>
	);
}

const styles = StyleSheet.create({});

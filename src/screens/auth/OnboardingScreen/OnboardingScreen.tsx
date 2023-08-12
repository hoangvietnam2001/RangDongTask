import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {firebase} from '../../../../FireBaseConfig';

export default function OnboardingScreen({navigation}: {navigation: any}) {
	// console.log(typeof navigation)

	function check() {
		if (firebase.apps.length) {
			console.log('Da ket noi');
			console.log(firebase.apps.length);		
		} else {
			console.log('Chua ket noi');
		}
	}

	return (
		<ScrollView style={styles.container}>
			<Image
				source={require('./anh1.jpg')}
				style={styles.img}
			/>
			<View style={styles.body}>
				<Text style={styles.title}>Best task management app</Text>
				<Text style={styles.subtitle}>
					Get organized by sorting out all your tasks and boost your
					productivity.
				</Text>
				<TouchableOpacity
					style={styles.btnLogin}
					onPress={() => navigation.navigate('Login')}>
					<Text style={styles.textBtn}>Log in</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnGetStarted} onPress={() => {check()}}>
					<Text style={styles.textBtn}>Get started</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#fff'
	},
	img: {
		width: '100%',
		height: 535,
	},
	body: {
		marginTop: -126,
		backgroundColor: '#fff',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		// height: '100%',
		alignItems: 'center',
		justifyContent:'center'
	},
	title: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '700',
		fontSize: 22,
		lineHeight: 34,
		textAlign: 'center',
		marginTop: 36,
	},
	subtitle: {
		textAlign: 'center',
		fontWeight: '400',
		fontSize: 15,
		lineHeight: 20,
		paddingVertical: 6,
		width: 284,
		marginBottom: 5,
	},
	btnLogin: {
		width: 280,
		height: 36,
		backgroundColor: '#403572',
		marginVertical: 15,
		borderRadius: 10,
		justifyContent: 'center',
	},
	btnGetStarted: {
		width: 280,
		height: 36,
		backgroundColor: '#4681A3',
		justifyContent: 'center',
		borderRadius: 10,
		marginBottom: 20,
	},
	textBtn: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: '700',
		fontSize: 15,
	},
});

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import React from 'react';
import {navigate} from './../../node_modules/@react-navigation/routers/src/CommonActions';

export default function LoginScreen({navigation}: {navigation: any}) {
	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.title}>Welcome back!</Text>

				<TextInput style={styles.textInput} placeholder="Email" />
				<TextInput style={styles.textInput} placeholder="Password" />
				<TouchableOpacity
					style={styles.btn}
					onPress={() => navigation.navigate('HomeDrawer',{screen:'Home'})}>
					<Text style={styles.textBtn}>Log in</Text>
				</TouchableOpacity>

				<View style={styles.footer}>
					<Text style={styles.textFooter}>Not registered?</Text>
					<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
						<Text style={styles.textSignUp}> Sign up!</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({

	container: {
		flex: 1,
		alignItems: 'center',
	},
	title: {
		fontSize: 28,
		width: 330,
		lineHeight: 34,
		fontWeight: '700',
		fontFamily: 'Roboto-Regular',
		letterSpacing: 0.36,
		marginTop: 50,
		color: '#173147',
		marginBottom: 35,
	},
	textInput: {
		height: 46,
		width: 330,
		backgroundColor: '#ADAFB6',
		paddingVertical: 15,
		marginVertical: 15,
		borderRadius: 10,
		paddingHorizontal: 20,
	},
	btn: {
		height: 46,
		width: 330,
		alignItems: 'center',
		backgroundColor: '#403572',
		borderRadius: 10,
		marginTop: 24,
		justifyContent: 'center',
	},
	textBtn: {
		fontWeight: '700',
		fontSize: 15,
		lineHeight: 20,
		letterSpacing: -0.24,
		textAlign: 'center',
		color: '#fff',
	},
	footer: {
		marginTop: 30,
		flexDirection: 'row',
        marginBottom:30
	},
	textFooter: {
		fontSize: 15,
		lineHeight: 20,
		fontWeight: '400',
		letterSpacing: -0.24,
		textAlign: 'center',
		color: '#8B97A8',
	},
	textSignUp: {
		fontSize: 15,
		lineHeight: 20,
		fontWeight: '700',
		letterSpacing: -0.24,
		textAlign: 'center',
		color: '#403572',
	},
});

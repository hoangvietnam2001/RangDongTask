import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	TouchableOpacity,
	ScrollView,
	Keyboard,
	Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}: {navigation: any}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		checkLoginInfo();
	}, []);

	// Xử lí nút đăng nhập
	const handleLogin = async () => {
		try {
			if (email.length === 0 || password.length === 0) {
				Alert.alert('Type full fields');
			} else {
				const useCredential = await auth()
					.signInWithEmailAndPassword(email, password)
					.then(userCredential => {
						const user = userCredential.user;
						// Lấy địa chỉ email của người dùng hiện tại
						const userEmail = user.email;
						console.log('Địa chỉ email người dùng:', userEmail);
					});
				saveLoginInfo(email, password);
				navigation.navigate('HomeDrawer');
				setEmail('');
				setPassword('');
			}
		} catch (error) {
			Alert.alert('Invalid email or password');
			console.log(error);
		}
	};

	// lưu thông tin email pass
	const saveLoginInfo = async (email: string, password: string) => {
		try {
			await AsyncStorage.setItem('email', email);
			await AsyncStorage.setItem('password', password);
		} catch (error) {
			console.log('Error when login :', error);
		}
	};

	// checklogin
	const checkLoginInfo = async () => {
		try {
			const email = await AsyncStorage.getItem('email');
			const password = await AsyncStorage.getItem('password');
			console.log(email, '-', password);
			
			if (email && password) {
				// tu dong dien
				setEmail(email);
				setPassword(password);
			}
		} catch (error) {
			console.log('Error retrieving login information:', error);
		}
	};
	return (
		// <ScrollView>
		<View style={styles.container}>
			<Text style={styles.title}>Welcome back!</Text>

			<TextInput
				style={styles.textInput}
				placeholder="Email"
				value={email}
				onChangeText={text => setEmail(text)}
			/>
			<TextInput
				style={styles.textInput}
				placeholder="Password"
				value={password}
				onChangeText={text => setPassword(text)}
				secureTextEntry
			/>
			<TouchableOpacity style={styles.btn} onPress={() => handleLogin()}>
				<Text style={styles.textBtn}>Log in</Text>
			</TouchableOpacity>

			<View style={styles.footer}>
				<Text style={styles.textFooter}>Not registered?</Text>
				<TouchableOpacity
					onPress={() =>
						// navigation.navigate('SignUp')
						navigation.navigate('SignUp')
					}>
					<Text style={styles.textSignUp}> Sign up!</Text>
				</TouchableOpacity>
			</View>
		</View>
		// {/* </ScrollView> */}
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#FFF',
	},
	title: {
		fontSize: 28,
		width: 330,
		lineHeight: 34,
		fontWeight: '700',
		fontFamily: 'Roboto-Regular',
		letterSpacing: 0.36,
		marginTop: 80,
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
		marginBottom: 30,
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

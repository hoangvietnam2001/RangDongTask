import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
	Alert,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BackHandler} from 'react-native';
import {Keyboard} from 'react-native';

export default function SignUpScreen({navigation}: {navigation: any}) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [passWord, setPassWord] = useState('');
	const [confirm, setConfirm] = useState('');

	const [check, setCheck] = useState(false);
console.log(check);

	// Hàm lưu thông tin người dùng vào Firestore
	const saveUserData = (uId: any, fName: any, lName: any) => {
		firestore()
			.collection('user')
			.doc(uId)
			.set({
				firstName: fName,
				lastName: lName,
			})
			.then(() => {
				console.log('User data saved to Firestore.');
			})
			.catch(error => {
				console.error('Error saving user data :', error);
			});
	};
	// Hàm xử lý sau khi người dùng đăng ký
	const handleSignUp = (
		email: any,
		password: any,
		firstname: any,
		lastname: any,
	) => {
		auth()
			.createUserWithEmailAndPassword(email, passWord)
			.then(userCredential => {
				const user = userCredential.user;
				// luu data
				saveUserData(user.uid, firstname, lastname);
				Alert.alert('Register Successfully');
				resetText();
				console.log(user.uid);
			})
			.catch(error => {
				console.error('Error signing up:', error);
			});
	};
	const resetText = () => {
		setEmail('');
		setFirstName('');
		setLastName('');
		setPassWord('');
		setConfirm('');
	};
	// React.useEffect(() => {
	// 	Keyboard.addListener('keyboardDidHide', () => {
	// 		console.log('Hide')
	// 	})
	// }, [])

	const handleText = (
		email: string,
		firstName: string,
		lastName: string,
		passWord: string,
		confirm: string,
	) => {
		// console.log('Press')

		if (
			email.length == 0 ||
			firstName.length == 0 ||
			lastName.length == 0 ||
			passWord.length == 0 ||
			confirm.length == 0 || check===false
		) {
			Alert.alert('Type full fields and agree condition');
		} else {
			if (passWord !== confirm) {
				Alert.alert('Password and Confirm password not the same');
			} else {
				handleSignUp(email, passWord, firstName, lastName);
			}
		}
	};
	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.title}>Join the hub!</Text>

				<TextInput
					style={styles.textInput}
					placeholder="First Name"
					onChangeText={text => setFirstName(text)}
					value={firstName}
				/>
				<TextInput
					style={styles.textInput}
					placeholder="Last Name"
					onChangeText={text => setLastName(text)}
					value={lastName}
				/>
				<TextInput
					style={styles.textInput}
					placeholder="Email"
					onChangeText={text => setEmail(text)}
					value={email}
				/>
				<TextInput
					style={styles.textInput}
					placeholder="Password"
					onChangeText={text => setPassWord(text)}
					value={passWord}
				/>
				<TextInput
					style={styles.textInput}
					placeholder="Confirm Password"
					onChangeText={text => setConfirm(text)}
					value={confirm}
				/>
				<View style={[styles.term, {flexDirection: 'row'}]}>
					<Ionicons
						name={check ? 'checkbox-outline':'square-outline'}
						size={20}
						color={'#403572'}
						onPress={() => setCheck(!check)}
					/>
					<Text style={styles.textTerm}>
						I agree to{' '}
						<Text style={styles.textCustom}>Terms and Conditions</Text> and
						<Text style={styles.textCustom}> Privacy Policy </Text>
					</Text>
				</View>
				<TouchableOpacity
					style={styles.btn}
					onPress={
						//navigation.navigate('HomeDrawer', {screen: 'Home'})
						() => handleText(email, firstName, lastName, passWord, confirm)
					}>
					<Text style={styles.textBtn}>Create account</Text>
				</TouchableOpacity>

				<View style={styles.footer}>
					<Text style={styles.textFooter}>Already registered?</Text>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text style={styles.textSignIn}> Sign in!</Text>
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
		marginBottom: 15,
	},
	textInput: {
		height: 46,
		width: 330,
		backgroundColor: '#ADAFB6',
		marginVertical: 10,
		borderRadius: 10,
		paddingHorizontal: 20,
	},
	term: {
		marginTop: 10,
		height: 20,
		width: 330,
	},
	textTerm: {
		fontSize: 12,
		fontWeight: '400',
		lineHeight: 20,
		letterSpacing: -0.24,
		textAlign: 'center',
		marginLeft: 10,
	},
	btn: {
		height: 46,
		width: 330,
		alignItems: 'center',
		backgroundColor: '#5551FF',
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
	textSignIn: {
		fontSize: 15,
		lineHeight: 20,
		fontWeight: '700',
		letterSpacing: -0.24,
		textAlign: 'center',
		color: '#403572',
	},
	textCustom: {
		color: '#707070',
		textDecorationLine: 'underline',
	},
});

import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignUpScreen({navigation}: {navigation: any}) {
	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.title}>Join the hub!</Text>

				<TextInput style={styles.textInput} placeholder="First Name" />
				<TextInput style={styles.textInput} placeholder="Last Name" />
				<TextInput style={styles.textInput} placeholder="Email" />
				<TextInput style={styles.textInput} placeholder="Password" />
				<TextInput style={styles.textInput} placeholder="Confirm Password" />
				<View style={[styles.term, {flexDirection: 'row'}]}>
					<Ionicons name="square-outline" size={20} color={'#403572'} />
					<Text style={styles.textTerm}>
						I agree to{' '}
						<Text style={styles.textCustom}>Terms and Conditions</Text> and
						<Text style={styles.textCustom}> Privacy Policy </Text>
					</Text>
				</View>
				<TouchableOpacity
					style={styles.btn}
					onPress={() => navigation.navigate('HomeDrawer',{screen:'Home'})}
				>
					<Text style={styles.textBtn}>Create account</Text>
				</TouchableOpacity>

				<View style={styles.footer}>
					<Text style={styles.textFooter}>Already registered?</Text>
					<TouchableOpacity
					onPress={() => navigation.navigate('Login')}
					>
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
    textCustom:{
        color:'#707070',
        textDecorationLine:"underline"
    }
});

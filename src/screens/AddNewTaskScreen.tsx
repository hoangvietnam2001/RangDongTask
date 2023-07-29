import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Button,
	Platform,
	SafeAreaView,
	Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import categories from '../utils/categories';

import DataUser from '../utils/dataUser';

export default function AddNewTaskScreen({navigation}: {navigation: any}) {
	// datetimepicker
	const [time, setTime] = useState('');
	const [showPicker, setShowPicker] = useState(false);

	const [category, setCategory] = useState('');
	const [status, setStatus] = useState(false);
	const [deadline, setDeadline] = useState('');
	const [des, setDes] = useState('');
	const [id, setId] = useState(auth().currentUser?.uid);
	const [isActive, setIsActive] = useState(0);

	// confirm datetime
	const handleConfirm = (selectedDate: any) => {
		// setDeadline(format(selectedDate,'HH:mm:ss dd/MM/yyyy') )
		setShowPicker(false);
		if (selectedDate) {
			setTime(selectedDate);
			setDeadline(format(selectedDate, 'HH:mm:ss dd/MM/yyyy'));
		}
	};

	// show date time
	const showDateTimePicker = () => {
		setShowPicker(true);
	};

	// format date time
	const formatDate = (date: any) => {
		return format(date, 'HH:mm:ss dd/MM/yyyy');
	};

	// set data
	const setData = () => {
		setDes('');
		setDeadline('');
		setCategory('');
		setTime('');
		setIsActive(0);
	};
	// handle button addnewtasks
	const addData = async (
		category: string,
		status: boolean,
		deadline: string,
		des: string,
		id?: string,
	) => {
		try {
			if (category === '' || des === '' || deadline == '' || id === null) {
				Alert.alert('Type full fields');
			} else {
				await firestore().collection('Task').add({
					category: category,
					status: false,
					deadline: deadline,
					description: des,
					userId: id,
				});
				setData();
				// console.log('Add success');
				Alert.alert('Added Successfully');
			}
		} catch (err) {
			console.log('Have error :', err);
		}
	};

	// render category items
	const Item = ({item}: {item: any}) => {
		return (
			<TouchableOpacity
				onPress={() => {
					setCategory(item.name)
					setIsActive(item.id);
				}}
				style={[
					styles.items,
					{
						backgroundColor: isActive === item.id ? '#EEEFF0' : '',
						borderWidth: isActive === item.id ? 0 : 1,
					},
				]}>
				<Text style={styles.itemText}>{item.name}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
			<View style={styles.container}>
				<Text style={styles.todoTaskText}>Add New Task</Text>

				<View style={styles.des}>
					<Text style={styles.text}>Describe the task</Text>
					<TextInput
						placeholder="Type here..."
						style={styles.textInput}
						value={des}
						onChangeText={text => setDes(text)}
					/>
				</View>
				<View style={styles.des}>
					<Text style={styles.text}>Type</Text>
					<View style={styles.tasks}>
						<FlatList
							data={categories}
							renderItem={({item}) => {
								return <Item item={item} />;
							}}
							keyExtractor={item => item.id.toString()}
							horizontal
						/>
					</View>
				</View>
				{/* deadline  */}
				<View style={styles.deadline}>
					<Text style={styles.text}>Deadline</Text>
					<Ionicons
						onPress={showDateTimePicker}
						name="calendar"
						size={30}
						color={'#707070'}
						style={{position: 'absolute', top: 50, left: 15, zIndex: 100}}
					/>
					<TextInput
						value={time ? formatDate(time) : ''}
						placeholder="Due date..."
						style={styles.textInputDealine}
						editable={false}></TextInput>

					<DateTimePickerModal
						isVisible={showPicker}
						mode="datetime" // Chọn cả date và time
						date={time ? time : new Date()}
						onConfirm={handleConfirm}
						onCancel={() => setShowPicker(false)}
					/>
				</View>

				{/* button  */}
				<TouchableOpacity
					style={styles.btnBackground}
					onPress={() => {
						addData(category, false, deadline, des, auth().currentUser?.uid);
						// console.log(category);
						
					}}>
					<Text style={styles.btnText}>Add the task</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	todoTaskText: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '300',
		fontSize: 24,
		lineHeight: 28.13,
		color: '#403572',
		marginTop: 40,
		marginLeft: -170,
	},
	des: {
		marginTop: 40,
		height: 60,
		width: 320,
	},
	text: {
		fontWeight: '500',
		fontSize: 12,
		lineHeight: 17,
		letterSpacing: 0.21,
		color: '#173147',
	},
	textInput: {
		fontWeight: '400',
		fontSize: 12,
		letterSpacing: 0.21,
		lineHeight: 17,
		color: '#707070',
		marginTop: 10,
		borderWidth: 1,
		borderColor: '#173147',
		borderRadius: 10,
		paddingHorizontal: 15,
	},
	items: {
		width: 94.87,
		height: 37,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#4681A3',
		marginRight: 10,
		borderRadius: 10,
	},
	itemText: {
		fontWeight: '600',
		fontSize: 12,
		lineHeight: 14.52,
		color: '#4681A3',
		letterSpacing: -0.1,
	},
	tasks: {
		marginTop: 12,
	},
	deadline: {
		marginTop: 35,
		height: 60,
		width: 320,
		borderColor: '#173147',
	},
	textInputDealine: {
		fontWeight: '400',
		fontSize: 12,
		letterSpacing: 0.21,
		lineHeight: 17,
		color: '#707070',
		marginTop: 25,
		borderWidth: 1,
		borderColor: '#173147',
		borderRadius: 10,
		paddingHorizontal: 50,
		height: 50,
	},
	btnBackground: {
		marginTop: 70,
		borderRadius: 10,
		height: 46,
		backgroundColor: '#4681A3',
		width: 320,
		justifyContent: 'center',
		marginBottom: 20,
		borderColor: '#5551FF',
	},
	btnText: {
		fontSize: 15,
		fontWeight: '700',
		lineHeight: 20,
		letterSpacing: -0.24,
		textAlign: 'center',
		color: '#fff',
	},
});

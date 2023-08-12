import {
	StyleSheet,
	Text,
	View,
	FlatList,
	SafeAreaView,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import levelsData from '../../../utils/levelData';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

const Item = ({item}: {item: any}) => {
	return (
		<View
			style={[
				styles.item,
				item.name === 'Due Deadline' ? styles.back2 : styles.back1,
			]}>
			<Text
				style={[
					styles.name,
					item.name === 'Due Deadline' ? styles.item2 : styles.item1,
				]}>
				{item.name}
			</Text>
			<Text
				style={[
					styles.quantity,
					item.name === 'Due Deadline' ? styles.item2 : styles.item1,
				]}>
				{item.quantity}
			</Text>
		</View>
	);
};

const data = [
	{
		id: 1,
		name: 'High Priority',
		quantity: 2,
	},
	{
		id: 2,
		name: 'Due Deadline',
		quantity: 1,
	},
	{
		id: 3,
		name: 'Quick Win',
		quantity: 3,
	},
];

export default function Home({navigation}: {navigation: any}) {
	const U_ID = auth().currentUser?.uid;
	const [data, setData] = useState([]);
	const [levelData, setLeveldata] = useState(levelsData);
	const [high, setHigh] = useState(0);
	const [due, setDue] = useState(0);
	const [win, setWin] = useState(0);

	useEffect(() => {
		// updateLevelData();

		const query = firestore()
			.collection('Task')
			.where('userId', '==', U_ID)
			.onSnapshot(querySnapshot => {
				const updateTodos = querySnapshot.docs.map(doc => doc.data());
				setData(updateTodos);
			});
		return () => {
			query();
		};
	}, [U_ID]);

	// xu li khi thay doi data
	useEffect(() => {
		updateLevelData();
	}, [data]);

	// set number
	const setNumberLevel = (high: number, due: number, quickWin: number) => {
		setHigh(high);
		setDue(due);
		setWin(quickWin);
	};

	
	const updateLevelData = () => {
		const getNumberTime = (time: string) => {
			return moment(time, 'HH:mm:ss DD-MM-YYYY').toDate().getTime() / 86400000;
		};
		const currentDate = new Date().getTime() / 86400000;

		const highNumber = data.filter(
			item =>
				getNumberTime(item.deadline) - currentDate > 0 &&
				item.status === false &&
				getNumberTime(item.deadline) - currentDate <= 1,
		).length;
		const dueNumber = data.filter(
			item =>
				item.status === false && getNumberTime(item.deadline) - currentDate < 0,
		).length;
		const quickWinNumber = data.filter(
			item =>
				getNumberTime(item.deadline) - currentDate > 0 && item.status === true,
		).length;

		setNumberLevel(highNumber, dueNumber, quickWinNumber);

		const newLevelData = [
			{
				id: 1,
				quantity: highNumber,
			},
			{
				id: 2,
				quantity: dueNumber,
			},
			{
				id: 3,
				quantity: quickWinNumber,
			},
		];

		const updateLevelDataRoot = levelData.map(item => {
			const updateQuantity = newLevelData.find(
				updatedItem => item.id === updatedItem.id,
			);
			if (updateQuantity) {
				return {...item, quantity: updateQuantity.quantity};
			}
			return item;
		});
		setLeveldata(updateLevelDataRoot);
		console.log('New Obj:', updateLevelDataRoot);

	};

	return (
		<View style={styles.container}>
			{/* Daily Task  */}
			<View style={styles.dailyTask}>
				<Text style={styles.dailyTaskText}>Daily Tasks:</Text>
				<View style={styles.list}>
					<FlatList
						data={levelData}
						renderItem={({item}) => <Item item={item} />}
						keyExtractor={item => item.id.toString()}
						horizontal={true}
					/>
				</View>
			</View>

			{/* Check all task  */}
			<View style={styles.check}>
				<Text style={styles.checkTitle}>Check all my tasks</Text>
				<Text style={styles.checkText}>
					See all tasks and filter them by categories you have selected when
					creating them
				</Text>
			</View>

			{/* button Add  */}
			{/* <View style={styles.btn}> */}
			<TouchableOpacity
				style={styles.btnAdd}
				onPress={() => {
					console.log('====================================');
					navigation.navigate('AddNewTask');
				}}>
				<Text style={styles.textBtnAdd}>+</Text>
			</TouchableOpacity>
			{/* </View> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	dailyTask: {
		width: 320,
		height: 200,
		marginTop: 40,
		borderRadius: 15,
	},
	dailyTaskText: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '300',
		fontSize: 24,
		lineHeight: 28.13,
		color: '#403572',
		marginTop: 5,
	},
	list: {
		marginTop: 20,
		backgroundColor: '#fff',
	},
	item: {
		width: 98,
		height: 90,
		borderRadius: 10,
		justifyContent: 'space-around',
		marginHorizontal: 4,
		alignItems: 'flex-start',
	},
	item1: {
		color: '#4681A3',
	},
	item2: {
		color: '#FF3726',
	},
	back1: {
		backgroundColor: '#EEEFF0',
	},
	back2: {
		backgroundColor: '#FFF4F4',
	},
	name: {
		fontWeight: '400',
		fontSize: 10,
		lineHeight: 11.72,
		marginLeft: 5,
	},
	quantity: {
		fontWeight: '500',
		fontSize: 28,
		lineHeight: 32.81,
		marginLeft: 5,
	},
	check: {
		width: 315,
		height: 105,
		backgroundColor: '#EEEFF0',
		marginTop: 30,
		borderRadius: 15,
	},
	checkTitle: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 18.75,
		color: '#403572',
		marginVertical: 15,
		paddingHorizontal: 15,
	},
	checkText: {
		fontWeight: '400',
		fontSize: 12,
		lineHeight: 14.06,
		color: '#403572',
		paddingHorizontal: 15,
		paddingVertical: 5,
	},
	btnAdd: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#4681A3',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 480,
		right: 40,
	},
	textBtnAdd: {
		color: '#fff',
		fontSize: 28,
		fontWeight: '400',
	},
});
